import $ from '/script/$.js'

export default class BaseModal {
    $
    render(onClose) {
        this.$ = $.div('modal', this.getColor()).add(
            $.div('header').add(
                $.div('title').add(this.renderTitle()),
                $.create('button').class('center-flex').text('X').on('click', () => {
                    this.$.remove()
                    onClose?.()
                })
            ),
            this.renderContent()
        )
        return this.$
    }
    getColor() {}
    renderTitle() {return []}
    renderContent() {return []}
}