const {OAuth2Client} = require('google-auth-library')
const db = require('../db')
const Endpoint = require('./Endpoint')
const util = require('../util')
const config = require('../../config.json')

const client = new OAuth2Client()

module.exports = Endpoint.post('/api/sessions/google', async (req, res) => {
    if (isRequestInvalid(req)) {
        res.status(400).send()
        return
    }
    const {email, googleUserId} = await getRequestData(req)
    const agentId = await connectAgent(email, googleUserId)
    const sessionKey = await db.insertSession(agentId)
    res.cookie('session', sessionKey).redirect('/agent-dashboard')
})

function isRequestInvalid(req) {
    return (
        !util.validateString(req.body.credential, 1024 * 1024) ||
        !util.validateString(req.body['g_csrf_token'], 1024 * 1024) ||
        req.body['g_csrf_token'] !== req.cookies['g_csrf_token']
    )
}

async function getRequestData(req) {
    const ticket = await new Promise((resolve, reject) => {
        client.verifyIdToken({
            audience: config.swigClientId,
            idToken: req.body.credential
        }, (error, ticket) => {
            if (error) reject(error)
            else resolve(ticket)
        })
    })
    const payload = ticket.getPayload()
    return {email: payload.email, googleUserId: payload.sub}
}

// Given that a user has signed in with Google
// And we have their email and Google user I.D.
// This function returns the internal agent I.D. the user has logged into
// If no internal agent has been created for the user yet, one is created and connected
// If an internal agent has been created but not connected to Google, it is connected
async function connectAgent(email, googleUserId) {
    let agent = await dbSwig.getConnectedAgent(googleUserId)
    if (agent) // Agent has signed in with Google before
        return agent['rowid']
    agent = await dbSwig.getDisconnectedAgent(email)
    if (agent) { // Agent has already registered but has not signed in with Google
        await dbSwig.updateConnection(agent['rowid'], googleUserId)
        return agent['rowid']
    }
    // Agent has neither registered nor signed in with Google
    return await dbSwig.createAgent(email, googleUserId)
}

const dbSwig = {
    async getConnectedAgent(googleUserId) {
        return await db.get(
            'SELECT rowid FROM agent WHERE google_user = ?;',
            googleUserId
        )
    },
    async getDisconnectedAgent(email) {
        return await db.get(
            'SELECT rowid FROM agent WHERE email = ?;',
            email
        )
    },
    async createAgent(email, googleUserId) {
        const dbStmt = await db.run(
            'INSERT INTO agent (email, google_user) VALUES (?, ?);',
            email,
            googleUserId
        )
        const agentId = dbStmt['lastID']
        return agentId
    },
    async updateConnection(agentId, googleUserId) {
        await db.run(
            'UPDATE agent SET google_user = ? WHERE rowid = ?;',
            googleUserId,
            agentId
        )
    }
}