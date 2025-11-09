export default class DomUtil {
    static onLoad(fun) {
        addEventListener('load', () => {
            fun()
        })
    }
    static id(id) {
        return new DomUtil(document.getElementById(id))
    }
    static create(tag) {
        return new DomUtil(document.createElement(tag))
    }
    static body() {
        return new DomUtil(document.body)
    }
    static br() {
        return DomUtil.create('br')
    }
    static hr() {
        return DomUtil.create('hr')
    }
    static div(...classes) {
        return DomUtil.create('div').class(...classes)
    }
    static span(...classes) {
        return DomUtil.create('span').class(...classes)
    }
    static resolveOne(whatnot) {
        if (whatnot instanceof Node)
            return whatnot
        if (whatnot instanceof DomUtil)
            return whatnot.node
        if (typeof whatnot === 'string')
            return document.createTextNode(whatnot)
        if (typeof whatnot === 'number')
            return document.createTextNode(String(whatnot))
        return null
    }
    static resolveMany(...whatnot) {
        return whatnot.flat(Infinity)
            .map(DomUtil.resolveOne)
            .filter(node => !!node)
    }
    static wrap(...whatnot) {
        const nodes = DomUtil.resolveMany(...whatnot)
        return nodes.map(node => new DomUtil(node))
    }
    node
    constructor(node) {
        this.node = node
    }
    get checked() {return this.node.checked}
    get value() {return this.node.value}
    on(eventName, onFired, options) {
        this.node.addEventListener(eventName, onFired, options)
        return this
    }
    off(eventName, onFired, options) {
        this.node.removeEventListener(eventName, onFired, options)
        return this
    }
    text(text) {
        this.node.textContent = text
        return this
    }
    add(...children) {
        children = DomUtil.resolveMany(...children)
        for (const child of children)
            this.node.appendChild(child)
        return this
    }
    hide() {
        this.node.style.display = 'none'
        return this
    }
    class(...classes) {
        classes = classes.flat(Infinity)
        classes = classes.map(className => {
            if (typeof className !== 'string')
                return className
            const parts = className.split(' ')
            return parts.length > 1 ? parts : className
        }).flat()
        for (const className of classes)
            this.node.classList.toggle(className, true)
        return this
    }
    noClass(...classes) {
        classes = classes.flat(Infinity)
        for (const className of classes)
            this.node.classList.toggle(className, false)
        return this
    }
    toggleClass(className, active) {
        this.node.classList.toggle(className, active)
        return this
    }
    withAttribute(nameOrObject, value) {
        if (typeof nameOrObject === 'object') {
            for (const key in nameOrObject)
                this.withAttribute(key, nameOrObject[key])
            return this
        }
        this.node.setAttribute(nameOrObject, value)
        return this
    }
    attribute(name, value) {return this.withAttribute(name, value)}
    attr(name, value) {return this.withAttribute(name, value)}
    clean() {
        this.children.forEach($child => {$child.remove()})
        return this
    }
    clear() {return this.clean()}
    remove() {
        this.node.remove()
        return this
    }
    get children() {
        return DomUtil.wrap(...this.node.childNodes)
    }
}