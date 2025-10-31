const bcrypt = require('bcrypt')
const Endpoint = require('./Endpoint')
const db = require('../db')
const util = require('../util')

module.exports = Endpoint.post('/api/agents/reset-password', async (req, res) => {
    if (await isRequestInvalid(req)) {
        res.status(400).send()
        return
    }
    const resetData = await getResetData(req)
    if (!resetData) {
        res.status(400).send()
        return
    }
    await updateAgent(req, resetData.agent)
    await deleteResetData(resetData)
    const sessionKey = await db.insertSession(resetData.agent)
    ; (res
        .cookie('session', sessionKey)
        .redirect('/agent-dashboard'))
})

async function isRequestInvalid(req) {
    if (
        !util.validateString(req.body.key, 1024) ||
        !util.validatePassword(req.body.input)
    ) return true
    return false
}

async function getResetData(req) {
    return await db.get(
        'SELECT rowid, agent FROM reset_password WHERE key = ?;',
        req.body.key
    )
}

async function updateAgent(req, agentId) {
    await db.run(
        'UPDATE agent SET hash = ? WHERE rowid = ?;',
        await bcrypt.hash(req.body.input, 10),
        agentId
    )
}

async function deleteResetData(resetData) {
    await db.run(
        'DELETE FROM reset_password WHERE rowid = ?;',
        resetData['rowid']
    )
}