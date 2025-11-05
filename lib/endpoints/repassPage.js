const path = require('path')
const fs = require('fs')
const db = require('../db')
const util = require('../util')
const Endpoint = require('./Endpoint')

const pageHtml = fs.readFileSync(path.join(__dirname, '../repassPage.html'))

module.exports = Endpoint.get('/reset-password', async (req, res) => {
    if (isRequestInvalid(req)) {
        res.status(400).send()
        return
    }
    if (!(await repassDataExists(req))) {
        res.status(400).send()
        return
    }
    res.status(200).type('html').send(pageHtml)
})

function isRequestInvalid(req) {
    return !util.validateString(req.query.key, 1024)
}

async function repassDataExists(req) {
    return await db.exists('reset_password WHERE key = ?', req.query.key)
}