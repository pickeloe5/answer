import '/agent-dashboard/hours-input.js'
import $ from '/script/$.js'
import RegisterNodeModal from '/script/modals/registerNode.js'

$.onLoad(async () => {
    await google.maps.importLibrary('places')
    $.id('register-node').on('click', () => {
        popModal(new RegisterNodeModal())
    })
    $.id('logout').on('click', () => {
        logout()
    })
})

function popModal(modal) {
    $.id('modal').clean().add(modal.render(() => {
        $.id('modal').noClass('active')
    }))
    $.id('modal').class('active')
}

async function logout() {
    const response = await fetch('/api/sessions/me', {method: 'DELETE'})
    // Response status is 400 when there was no session to delete
    if (response.status !== 200 && response.status !== 400) {
        console.log('Unexpected response status from logout', response.status)
        return
    }
    location.href = '/'
}