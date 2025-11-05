import $ from '/script/$.js'
import Modal from '/script/modals/index.js'

let $modal, $notModal

$.onLoad(async () => {
    $modal = $.id('modal')
    $notModal = $.id('not-modal')
    loadMap()
    loadMenuCta()
})

async function loadMenuCta() {
    const isLoggedIn = await fetchIsLoggedIn()
    return $.id('menu-cta').add(
        $.create('button').class('amber').add(
            $.span('material-symbols-sharp').text('search'),
            'Find food'
        ).on('click', () => {
            popModal(Modal.FindFood)
        }),
        $.create('button').class('blue').text('Give food')
            .on('click', () => {popModal(Modal.GiveFood)}),
        !isLoggedIn ? [
            $.create('button').class('green').text('Become an agent')
                .on('click', () => {popModal(Modal.Register)}),
            $.create('button').class('purple').text('Login')
                .on('click', () => {popModal(Modal.Login)})
        ] : [
            $.create('button').class('green').text('Register a node'),
            $.create('button').class('purple').text('Logout')
                .on('click', () => {logout()})
        ]
    )
}

function popModal(ModalImpl) {
    ModalImpl.pop($modal, () => {
        $modal.noClass('active')
        $notModal.noClass('modal-active')
    })
    $modal.class('active')
    $notModal.class('modal-active')
}

async function fetchIsLoggedIn() {
    const response = await fetch(
        '/api/sessions/is-logged-in',
        {headers: {'Accept': 'application/json'}}
    )
    if (response.status !== 200)
        return false
    let responseBody
    try {
        responseBody = await response.json()
    } catch {
        return false
    }
    return responseBody?.isLoggedIn === true
}

async function logout() {
    const response = await fetch(
        '/api/sessions/me',
        {method: 'DELETE'}
    )
    if (response.status === 200)
        location.reload()
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