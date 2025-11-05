const Endpoint = require('./Endpoint')
const db = require('../db')
const util = require('../util')

module.exports = Endpoint.delete('/api/sessions/me', async (req, res) => {
    const sessionKey = req.cookies.session
    if (!util.validateString(sessionKey, 1024)) {
        res.status(400).send()
        return
    }
    await db.run(
        'DELETE FROM session WHERE key = ?;',
        sessionKey
    )
    res.status(200).send()
})