// import {organizations} from '/script/dummy.js'

let $notModal
let $modalContainer
let $registerModal
let $loginModal
let $searchModal
let $giveModal

addEventListener('load', () => {
    $notModal = document.getElementById('not-modal')
    $modalContainer = document.getElementById('modal-container')
    $registerModal = document.getElementById('register-modal')
    $loginModal = document.getElementById('login-modal')
    $searchModal = document.getElementById('search-modal')
    $giveModal = document.getElementById('give-modal')
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
        toggleModal($loginModal, true)
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
    const map = L.map('map').setView([25.7706589,-80.2209766], 10)
    // const icon = L.icon({
    //     iconUrl: '/img/google-icons-dine-in.svg',
    //     iconSize: [48, 48],
    //     iconAnchor: [24, 24]
    // })
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
})

function toggleModal($modal, open) {
    $notModal.classList.toggle('modal-active', open)
    $modal.classList.toggle('active', open)
    $modalContainer.classList.toggle('active', open)
}