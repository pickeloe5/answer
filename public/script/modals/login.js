import $ from '/script/$.js'
import BaseModal from '/script/modals/base.js'
import '/script/swig-button.js'

export default class LoginModal extends BaseModal {
    getColor() {
        return 'purple'
    }
    renderTitle() {
        return 'Login'
    }
    renderContent() {
        let $email, $input, $loginGoogle
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
                autocomplete: 'current-password',
                name: 'input'
            })
        )
        $loginGoogle = $.div()
        google.accounts.id.renderButton($loginGoogle.node, {})
        return [
            $loginGoogle,
            $.br(),
            $.create('form')
                .attr('action', '/api/sessions')
                .attr('method', 'POST')
                .add(
                    $email, $.br(), $input, $.br(),
                    $.create('input').attr({type: 'submit', value: 'Submit'})
                ),
            $.br(),
            $.create('button').text('Forgot password')
        ]
    }
}