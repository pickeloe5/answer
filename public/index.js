// import {organizations} from '/script/dummy.js'
import $ from '/script/$.js'

let $notModal
let $modalContainer
let $registerModal
let $loginModal
let $searchModal
let $giveModal
let $registerInput2
let $repassModal
const $registerButton = $.create('button').class('green').text('Become an agent')
const $loginButton = $.create('button').class('purple').text('Login')
const $nodeButton = $.create('button').class('green').text('Register a node')
const $logoutButton = $.create('button').class('purple').text('Logout')

/*
<button class='green' id='register-button'>Become an agent</button>
<button class='purple' id='login-button'>Login</button>
*/

$.onLoad(() => {
    $notModal = $.id('not-modal')
    $modalContainer = $.id('modal-container')
    $registerModal = $.id('register-modal')
    $loginModal = $.id('login-modal')
    $searchModal = $.id('search-modal')
    $giveModal = $.id('give-modal')
    $registerInput2 = $.id('register-input2')
    $repassModal = $.id('repass-modal')
    fetch(
        '/api/sessions/is-logged-in',
        {headers: {'Accept': 'application/json'}}
    ).then(async response => {
        if (response.status === 400) {
            $.id('menu-cta').add($registerButton, $loginButton)
        } else if (response.status === 200) {
            const responseBody = await response.json()
            const isLoggedIn = responseBody?.isLoggedIn
            if (typeof isLoggedIn === 'boolean') {
                if (!isLoggedIn) {
                    $.id('menu-cta').add($registerButton, $loginButton)
                } else {
                    $.id('menu-cta').add($nodeButton, $logoutButton)
                }
            }
        }
    })
    $.id('register-modal-close').on('click', () => {
        toggleModal($registerModal, false)
    })
    $registerButton.on('click', () => {
        toggleModal($registerModal, true)
    })
    $.id('login-modal-close').on('click', () => {
        toggleModal($loginModal, false)
    })
    $loginButton.on('click', () => {
        toggleModal($loginModal, true)
    })
    $.id('search-modal-close').on('click', () => {
        toggleModal($searchModal, false)
    })
    $.id('search-button').on('click', () => {
        toggleModal($searchModal, true)
    })
    $.id('give-modal-close').on('click', () => {
        toggleModal($giveModal, false)
    })
    $.id('give-button').on('click', () => {
        toggleModal($giveModal, true)
    })
    $.id('repass-modal-close').on('click', () => {
        toggleModal($repassModal, false)
    })
    $.id('forgot-password').on('click', () => {
        toggleModal($loginModal, false)
        toggleModal($repassModal, true)
    })
    $.id('register-submit').on('click', event => {
        event.preventDefault()
        event.stopImmediatePropagation()
        event.stopPropagation()
        if (
            $.id('register-input').value !==
            $registerInput2.value
        ) {
            $registerInput2.class('bad')
            return false
        }
        fetch('/api/registrations', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: $.id('register-email').value,
                input: $registerInput2.value
            })
        }).then(response => {
            if (response.status !== 200) {
                alert('Dear god!')
                return
            }
            alert('Woohoo!')
        })
    })
    $registerInput2.on('focus', () => {
        $registerInput2.noClass('bad')
    })
    $.id('repass-modal-submit').on('click', () => {
        const email = $.id('repass-modal-input').value
        if (typeof email !== 'string' || email.length <= 0 || email.length > 1024)
            return;
        fetch('/api/reset-password', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email})
        }).then(response => {
            if (response.status !== 200) {
                console.log('Non-200 response status from forgot password', response.status)
                return
            }
            alert('Feedback!')
        })
    })
    $logoutButton.on('click', () => {
        fetch('/api/sessions/me', {method: 'DELETE'}).then(async response => {
            if (response.status === 200)
                location.reload()
        })
    })
    loadMap()
})

function toggleModal($modal, open) {
    $notModal.toggleClass('modal-active', open)
    $modal.toggleClass('active', open)
    $modalContainer.toggleClass('active', open)
}

function loadMap() {
    const map = L.map('map').setView([25.7706589,-80.2209766], 10)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)
    // for (const organization of organizations) {
    //     L.marker([
    //         organization.latitude,
    //         organization.longitude
    //     ], {title: 'Distributor'}).addTo(map)
    // }
}