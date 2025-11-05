import $ from '/script/$.js'
import BaseModal from '/script/modals/base.js'

export default class FindFoodModal extends BaseModal {
    getColor() {
        return 'amber'
    }
    renderTitle() {
        return 'Find Food'
    }
    renderContent() {
        return $.create('label').add(
            'Location:',
            $.create('input').attr('type', 'search').class('amber')
        )
    }
}