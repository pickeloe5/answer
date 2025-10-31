const db = require('./db')
const util = require('./util')

module.exports = (req, res, next) => {
    ; (async () => {
        const sessionKey = req.cookies.session
        if (
            !util.validateString(sessionKey, 1024) ||
            !(await db.exists('session WHERE key = ?', req.cookies.session))
        ) {
            res.status(404).send()
            return
        }
        next()
    })().catch(error => {
        console.log('Auth middleware errored')
        console.error(error)
        if (!res.headersSent)
            res.status(500).send()
    })
}