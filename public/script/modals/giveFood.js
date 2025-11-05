import $ from '/script/$.js'
import BaseModal from '/script/modals/base.js'

export default class GiveFoodModal extends BaseModal {
    getColor() {
        return 'blue'
    }
    renderTitle() {
        return 'Give Food'
    }
    renderContent() {
        return $.create('label').add(
            'Location:',
            $.create('input').attr('type', 'search')
        )
    }
}