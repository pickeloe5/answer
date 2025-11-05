import '/agent-dashboard/hours-input.js'
import $ from '/script/$.js'

addEventListener('load', () => {
    loadPlaces()
    $.id('register-node').on('click', () => {
        $.id('register-node-modal').class('active')
    })
    $.id('regnode-modal-close').on('click', () => {
        $.id('register-node-modal').noClass('active')
    })
    $.id('logout').on('click', () => {
        fetch(
            '/api/sessions/me',
            {method: 'DELETE'}
        ).then(async response => {
            if (response.status !== 200) {
                console.log('Non-zero response status from logout')
                return
            }
            location.href = '/'
        })
    })
})

async function loadPlaces() {
    await google.maps.importLibrary('places')
    const autocomplete = new google.maps.places.PlaceAutocompleteElement()
    $.id('regnode-place-input').add(autocomplete)
}

async function logout() {
    const response = await fetch('/api/sessions', {method: 'DELETE'})
    // Response status is 400 when there was no session to delete
    if (response.status !== 200 && response.status !== 400) {
        console.log('Non-200 response status from logout', response.status)
        return
    }
    location.href = '/'
}