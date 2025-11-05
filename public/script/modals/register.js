import $ from '/script/$.js'
import BaseModal from '/script/modals/base.js'

export default class RegisterModal extends BaseModal {
    getColor() {
        return 'green'
    }
    renderTitle() {
        return 'Register'
    }
    renderContent() {
        let $email, $input, $input2, $registerGoogle
        $email = $.create('label').add('Email:',
            $.create('input').attr({
                type: 'email',
                autocomplete: 'email',
                name: 'email'
            })
        )
        $input = $.create('label').add('Password:',
            $.create('input').attr({
                type: 'password',
                autocomplete: 'new-password',
                name: 'input'
            })
        )
        $input2 = $.create('label').add('Confirm password:',
            $.create('input').attr({
                type: 'password',
                autocomplete: 'new-password'
            })
        )
        $registerGoogle = $.div()
        google.accounts.id.renderButton($registerGoogle.node, {})
        return [
            $registerGoogle,
            $.br(),
            $.create('form')
                .attr('action', '/api/sessions')
                .attr('method', 'POST')
                .add(
                    $email, $.br(), $input, $.br(), $input2, $.br(),
                    $.create('input').attr({type: 'submit', value: 'Submit'})
                ),
        ]
    }
}