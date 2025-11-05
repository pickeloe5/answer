// import {organizations} from '/script/dummy.js'

let $notModal
let $modalContainer
let $registerModal
let $loginModal
let $searchModal
let $giveModal
let $registerInput2
let $repassModal

addEventListener('load', () => {
    $notModal = document.getElementById('not-modal')
    $modalContainer = document.getElementById('modal-container')
    $registerModal = document.getElementById('register-modal')
    $loginModal = document.getElementById('login-modal')
    $searchModal = document.getElementById('search-modal')
    $giveModal = document.getElementById('give-modal')
    $registerInput2 = document.getElementById('register-input2')
    $repassModal = document.getElementById('repass-modal')
    document.getElementById('register-modal-close').addEventListener('click', () => {
        toggleModal($registerModal, false)
    })
    document.getElementById('register-button').addEventListener('click', () => {
        toggleModal($registerModal, true)
    })
    document.getElementById('login-modal-close').addEventListener('click', () => {
        toggleModal($loginModal, false)
    })
    document.getElementById('login-button').addEventListener('click', () => {
        fetch(
            '/api/sessions/is-logged-in',
            {headers: {'Accept': 'application/json'}}
        ).then(async response => {
            if (response.status === 200) {
                const responseBody = await response.json()
                if (responseBody?.isLoggedIn)
                    location.href = '/agent-dashboard'
                else toggleModal($loginModal, true)
            }
        }).catch(() => {toggleModal($loginModal, true)})
    })
    document.getElementById('search-modal-close').addEventListener('click', () => {
        toggleModal($searchModal, false)
    })
    document.getElementById('search-button').addEventListener('click', () => {
        toggleModal($searchModal, true)
    })
    document.getElementById('give-modal-close').addEventListener('click', () => {
        toggleModal($giveModal, false)
    })
    document.getElementById('give-button').addEventListener('click', () => {
        toggleModal($giveModal, true)
    })
    document.getElementById('repass-modal-close').addEventListener('click', () => {
        toggleModal($repassModal, false)
    })
    document.getElementById('forgot-password').addEventListener('click', () => {
        toggleModal($loginModal, false)
        toggleModal($repassModal, true)
    })
    document.getElementById('register-submit').addEventListener('click', event => {
        event.preventDefault()
        event.stopImmediatePropagation()
        event.stopPropagation()
        if (
            document.getElementById('register-input').value !==
            $registerInput2.value
        ) {
            $registerInput2.classList.toggle('bad', true)
            return false
        }
        fetch('/api/registrations', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: document.getElementById('register-email').value,
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
    $registerInput2.addEventListener('focus', () => {
        $registerInput2.classList.toggle('bad', false)
    })
    document.getElementById('repass-modal-submit').addEventListener('click', () => {
        const email = document.getElementById('repass-modal-input').value
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
    loadMap()
})

function toggleModal($modal, open) {
    $notModal.classList.toggle('modal-active', open)
    $modal.classList.toggle('active', open)
    $modalContainer.classList.toggle('active', open)
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