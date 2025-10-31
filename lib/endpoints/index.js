const confirmEmail = require('./confirmEmail')
const forgotPassword = require('./forgotPassword')
const login = require('./login')
const logout = require('./logout')
const register = require('./register')
const resetPassword = require('./resetPassword')
const repassCancel = require('./resetPasswordCancel')
const swig = require('./swig')

const endpoints = [confirmEmail, forgotPassword, login, logout, register, resetPassword, repassCancel, swig]

module.exports = app => {
    endpoints.forEach(endpoint => {endpoint.route(app)})
}