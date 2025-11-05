import $ from '/script/$.js'

export default class BaseModal {
    static pop($parent, onClose) {
        $parent.add(new this(onClose).$)
    }
    $
    #onClose
    constructor(onClose) {
        this.#onClose = onClose
        this.render()
    }
    render() {
        this.$ = $.div('modal', this.getColor()).add(
            $.div('header').add(
                $.div('title').add(this.renderTitle()),
                $.create('button').class('center-flex').text('X').on('click', () => {
                    this.$.remove()
                    this.#onClose?.()
                })
            ),
            this.renderContent()
        )
    }
    getColor() {}
    renderTitle() {return []}
    renderContent() {return []}
}