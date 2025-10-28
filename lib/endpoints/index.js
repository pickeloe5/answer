const confirmEmail = require('./confirmEmail')
const forgotPassword = require('./forgotPassword')
const login = require('./login')
const register = require('./register')
const resetPassword = require('./resetPassword')

const endpoints = [confirmEmail, forgotPassword, login, register, resetPassword]

module.exports = app => {
    endpoints.forEach(endpoint => {endpoint.route(app)})
}