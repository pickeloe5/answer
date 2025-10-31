const Endpoint = require('./Endpoint')
const db = require('../db')
const util = require('../util')

module.exports = Endpoint.delete('/api/reset-password', async (req, res) => {
    if (!util.validateString(req.query.key, 1024)) {
        res.status(400).send()
        return
    }
    await db.run(
        'DELETE FROM reset_password WHERE key = ?;',
        req.query.key
    )
    res.status(200).send()
})