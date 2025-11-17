const Endpoint = require('./Endpoint')

module.exports = Endpoint.post('/api/nodes', async (req, res) => {
    const {name, latitude, longitude, address, goods, hours} = req.body
    console.log({name, latitude, longitude, address, goods, hours})
    res.status(400).send()
})