const confirmEmail = require('./confirmEmail')
const forgotPassword = require('./forgotPassword')
const isLoggedIn = require('./isLoggedIn')
const login = require('./login')
const loginGoogle = require('./loginGoogle')
const logout = require('./logout')
const register = require('./register')
const registerNode = require('./registerNode')
const repass = require('./repass')
const repassCancel = require('./repassCancel')
const repassGetEmail = require('./repassGetEmail')
const repassPage = require('./repassPage')

const endpoints = [
    confirmEmail, forgotPassword, isLoggedIn, login, loginGoogle,
    logout, register, registerNode, repass, repassCancel, repassGetEmail, repassPage
]

module.exports = app => {
    endpoints.forEach(endpoint => {endpoint.route(app)})
}