const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const config = require('../config.json')
const routeEndpoints = require('./endpoints')
const authMiddleware = require('./authMiddleware')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

routeEndpoints(app)
app.use(express.static(path.join(__dirname, '../public')))
app.use(authMiddleware, express.static(path.join(__dirname, '../private')))

app.listen(config.port, () => {
    console.log(`A.N.S.W.E.R. serving on port ${config.port}...`)
})