const Endpoint = require('./Endpoint')
const db = require('../db')
const mail = require('../mail')
const util = require('../util')

module.exports = Endpoint.post('/api/reset-password', async (req, res) => {
    if (await isRequestInvalid(req)) {
        res.status(400).send()
        return
    }
    const agent = await getAgent(req)
    if (!agent) {
        res.status(400).send()
        return
    }
    const key = await insertResetData(agent['rowid'])
    await mailResetPassword(req, key)
    res.status(200).send()
})

async function isRequestInvalid(req) {
    return (
        !util.validateEmail(req.body.email)
    )
}

async function getAgent(req) {
    return await db.get(
        'SELECT rowid FROM agent WHERE email = ?;',
        req.body.email
    )
}

async function insertResetData(agentId) {
    const dbStmt = await db.insert(
        'reset_password',
        {agent: agentId, time: Date.now()}
    )
    const resetId = dbStmt['lastID']
    const key = util.genKey(resetId)
    await db.run(
        'UPDATE reset_password SET key = ? WHERE rowid = ?;',
        key,
        resetId
    )
    return key
}

async function mailResetPassword(req, key) {
    const link = `https://answer.nickmatt.dev/reset-password?key=${key}`
    await mail(req.body.email, 'Forgot Password',
        'Click here to reset your password: ' +
            `<a href='${link}'>${link}</a>`
    )
}
