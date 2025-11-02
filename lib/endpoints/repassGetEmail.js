const Endpoint = require('./Endpoint')
const db = require('../db')
const util = require('../util')

module.exports = Endpoint.get('/api/reset-password/email', async (req, res) => {

    if (isRequestInvalid(req)) {
        res.status(400).send()
        return
    }

    const repassData = await getRepassData(req)
    if (!repassData) {
        res.status(400).send()
        return
    }

    const agent = await getAgent(repassData)
    return {email: agent.email}
    
})

function isRequestInvalid(req) {
    return !util.validateString(req.query.key, 1024)
}

async function getRepassData(req) {
    return await db.get(
        'SELECT agent FROM reset_password WHERE key = ?;',
        req.query.key
    )
}

async function getAgent(repassData) {
    return await db.get(
        'SELECT email FROM agent WHERE rowid = ?;',
        repassData.agent
    )
}