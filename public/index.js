import {organizations} from '/script/dummy.js'

let $notModal
let $modalContainer
let $registerModal
let $loginModal

addEventListener('load', () => {
    $notModal = document.getElementById('not-modal')
    $modalContainer = document.getElementById('modal-container')
    $registerModal = document.getElementById('register-modal')
    $loginModal = document.getElementById('login-modal')
    document.getElementById('register-modal-close').addEventListener('click', () => {
        $modalContainer.classList.toggle('active', false)
        $registerModal.classList.toggle('active', false)
        $notModal.classList.toggle('modal-active', false)
    })
    document.getElementById('register-button').addEventListener('click', () => {
        $notModal.classList.toggle('modal-active', true)
        $registerModal.classList.toggle('active', true)
        $modalContainer.classList.toggle('active', true)
    })
    document.getElementById('login-modal-close').addEventListener('click', () => {
        $modalContainer.classList.toggle('active', false)
        $loginModal.classList.toggle('active', false)
        $notModal.classList.toggle('modal-active', false)
    })
    document.getElementById('login-button').addEventListener('click', () => {
        $notModal.classList.toggle('modal-active', true)
        $loginModal.classList.toggle('active', true)
        $modalContainer.classList.toggle('active', true)
    })
    const map = L.map('map').setView([25.7706589,-80.2209766], 10)
    const icon = L.icon({
        iconUrl: '/img/google-icons-dine-in.svg',
        iconSize: [48, 48],
        iconAnchor: [24, 24]
    })
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)
    for (const organization of organizations) {
        L.marker([
            organization.latitude,
            organization.longitude
        ], {title: 'Distributor', icon}).addTo(map)
    }
})