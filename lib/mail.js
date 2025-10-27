const nodemailer = require('nodemailer')
const config = require('../config.json')

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.gmail.address,
        pass: config.gmail.key
    }
})

async function mail(to, subject, html) {
    await new Promise((resolve, reject) => {
        transporter.sendMail({
            address: config.gmail.address,
            to,
            subject,
            html
        }, error => {
            if (error)
                reject(error)
            else
                resolve()
        })
    })
}

module.exports = mail