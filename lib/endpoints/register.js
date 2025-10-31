const bcrypt = require('bcrypt')
const Endpoint = require('./Endpoint')
const db = require('../db')
const util = require('../util')
const mail = require('../mail')

module.exports = Endpoint.post('/api/registrations', async (req, res) => {
    if (await isRequestInvalid(req)) {
        res.status(400).send()
        return
    }
    const key = await insertRegistration(req)
    await mailRegistration(req, key)
    res.status(200).send()
})

async function isRequestInvalid(req) {
    if (!util.validateAuthStrings(req.body.email, req.body.input))
        return true
    if (await db.exists('agent WHERE email = ?', req.body.email))
        return true
    return false
}

async function insertRegistration(req) {
    const hash = await bcrypt.hash(req.body.input, 10)
    const dbStmt = await db.run(
        'INSERT INTO registration (email, hash) VALUES (?, ?);',
        req.body.email,
        hash
    )
    const registrationId = dbStmt['lastID']
    const key = await updateRegistrationKey(registrationId)
    return key
}

async function updateRegistrationKey(registrationId) {
    const key = util.genKey(registrationId)
    await db.run(
        'UPDATE registration SET key = ? WHERE rowid = ?;',
        key,
        registrationId
    )
    return key
}

async function mailRegistration(req, key) {
    const link = `https://answer.nickmatt.dev/confirm-email?key=${encodeURIComponent(key)}`
    await mail(
        req.body.email,
        'We Need You!',
        'Welcome to the network, Agent.<br />' +
            'Click here to confirm your email:<br />' +
            `<a href='${link}'>${link}</a>`
    )
}