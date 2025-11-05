import $ from '/script/$.js'
import BaseModal from '/script/modals/base.js'

export default class ForgotPasswordModal extends BaseModal {
    getColor() {
        return 'blue-gray'
    }
    renderTitle() {
        return 'Forgot Password'
    }
    renderContent() {
        return $.create('label').add(
            'Email:',
            $.create('input').attr({type: 'email', autocomplete: 'email'}),
            $.br(), $.br(), $.create('button').text('Submit')
        )
    }
}