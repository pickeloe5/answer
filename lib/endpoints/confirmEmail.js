const Endpoint = require('./Endpoint')
const db = require('../db')
const util = require('../util')

module.exports = Endpoint.get('/confirm-email', async (req, res) => {
    if (isRequestInvalid(req)) {
        res.status(400).send()
        return
    }
    const registration = await getRegistration(req)
    if (!registration) {
        res.status(400).send()
        return
    }
    const agentId = await insertAgent(registration)
    await deleteRegistration(req)
    const sessionKey = await db.insertSession(agentId)
    res.cookie('session', sessionKey).redirect('/agent-dashboard')
})

function isRequestInvalid(req) {
    return !util.validateString(req.query.key, 1024)
}

async function getRegistration(req) {
    return await db.get(
        'SELECT email, hash FROM registration WHERE key = ?;',
        req.query.key
    )
}

async function insertAgent(registration) {
    const dbStmt = await db.run(
        'INSERT INTO agent (email, hash) VALUES (?, ?);',
        registration.email,
        registration.hash
    )
    const agentId = dbStmt['lastID']
    return agentId
}

async function deleteRegistration(req) {
    await db.run(
        'DELETE FROM registration WHERE key = ?;',
        req.query.key
    )
}