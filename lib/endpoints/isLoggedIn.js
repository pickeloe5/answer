const db = require('../db')
const util = require('../util')
const Endpoint = require('./Endpoint')

module.exports = Endpoint.get('/api/sessions/is-logged-in', async (req, res) => {
    return {isLoggedIn:
        util.validateString(req.cookies.session, 1024) &&
        await db.exists('session WHERE key = ?', req.cookies.session)
    }
})