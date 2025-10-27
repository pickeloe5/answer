const login = require('./login')

const endpoints = [login]

module.exports = app => {
    endpoints.forEach(endpoint => {endpoint.route(app)})
}