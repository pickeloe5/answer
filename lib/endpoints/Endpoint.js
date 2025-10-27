class Endpoint {
    static post(path, handle) {
        return Endpoint.create('post', path, handle)
    }
    static get(path, handle) {
        return Endpoint.create('get', path, handle)
    }
    static put(path, handle) {
        return Endpoint.create('put', path, handle)
    }
    static patch(path, handle) {
        return Endpoint.create('patch', path, handle)
    }
    static delete(path, handle) {
        return Endpoint.create('delete', path, handle)
    }
    static create(method, path, handle) {
        return new (class extends Endpoint {
            constructor() {
                super(method, path)
            }
            async handle(req, res) {
                return await handle(req, res)
            }
        })()
    }
    method; path
    constructor(method, path) {
        this.method = method
        this.path = path
    }
    async handle(_req, _res) {}
    route(app) {
        app[this.method.toLowerCase()](this.path, (req, res) => {
            this.handle(req, res).then(data => {
                if (!res.headersSent) {
                    if (data)
                        res.json(data)
                    else
                        res.status(200).send()
                }
            }).catch(error => {
                if (!res.headersSent)
                    res.status(500).send()
                console.error(error)
            })
        })
    }
}

module.exports = Endpoint