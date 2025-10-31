const bcrypt = require('bcrypt')
const Endpoint = require('./Endpoint')
const db = require('../db')
const util = require('../util')

module.exports = Endpoint.post('/api/sessions', async (req, res) => {
    if (isRequestInvalid(req)) {
        res.status(400).send()
        return
    }
    const agent = await getAgent(req)
    if (await isRequestUnauthorized(req, agent)) {
        res.status(400).send()
        return
    }
    const sessionKey = await db.insertSession(agent['rowid'])
    ; (res
        .cookie('session', sessionKey)
        .redirect('/agent-dashboard'))
})

function isRequestInvalid(req) {
    return !util.validateAuthStrings(req.body.email, req.body.input)
}

async function getAgent(req) {
    return await db.get(
        'SELECT rowid, hash FROM agent WHERE email = ?;',
        req.body.email
    )
}

async function isRequestUnauthorized(req, agent) {
    if (!agent)
        return true
    return !(await bcrypt.compare(req.body.input, agent['hash']))
}