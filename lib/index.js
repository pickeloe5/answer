const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const config = require('../config.json')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, '../public')))

app.listen(config.port, () => {
    console.log(`A.N.S.W.E.R. serving on port ${config.port}...`)
})