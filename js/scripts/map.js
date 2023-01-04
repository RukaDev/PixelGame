// Elements
var mapContainer = document.querySelector('.map-container')
var pageContainer = document.querySelector('.page-container')
var sectionContainer = document.querySelector('.section-container')
var regionSpans = document.querySelectorAll('.regions span')
var section = document.querySelector('.section')
var regionCards = document.querySelectorAll('.container .card')


// Session stroage
sessionStorage.clear()
if (!sessionStorage.getItem('unlocked')) {
    setArray("unlocked", ['portfolio', 'about', 'service', 'contact'])
}


// Map 
function mapEnter() {
    mapContainer.classList.add('unfold')
    regionCards.forEach(region => {
        region.style.display = 'block'
    });
}

function mapLeave() {
    mapContainer.classList.remove('unfold')
    regionCards.forEach(region => {
        region.style.display = 'none'
    });
}


// Sections 
function removeSection(sectionElement) {
    section.classList.remove('show')
    sectionElement.classList.remove('show')
    pageContainer.classList.remove('blur')
}

function addSection(sectionElement) {
    section.classList.add('show')
    pageContainer.classList.add('blur')
    sectionElement.classList.add('show')
}


// Card configs
function addCloseBtn(sectionElement) {
    var closeBtn = document.createElement('a')
    closeBtn.classList.add('btnn')
    closeBtn.addEventListener('click', function() {
        removeSection(sectionElement)
    })
    var container = sectionElement.querySelector('.container')
    container.prepend(closeBtn)
}

function addGameBtn(region) {
    var gameBtn = region.querySelector('#play')
    gameBtn.addEventListener('click', function() { 
        gsap.to('#inner', {
            opacity: 1,
            repeat: 0,
            duration: 1.5,
            onComplete() {
                sessionStorage.setItem('GameName', region.id)
                window.location.href = '/html/game.html'
            }
        })
    })
}

function addSectionBtn(region, sectionElement) {
    var sectionBtn = region.querySelector('#view')
    sectionBtn.onclick = function() {
        addSection(sectionElement)
        return false
    }
}


// Completed cards
function setupRegions() {
    var unlockedNames = getArray('unlocked')

    // Get current unlock
    var arr = getArray('unlocked')
    var amnt = arr.length
    var nextUnlock = regionCards[amnt]

    regionCards.forEach(region => {
        var sectionElement = sectionContainer.querySelector('#' + region.id)

        if (unlockedNames.includes(region.id)) {
            addCloseBtn(sectionElement)
            addGameBtn(region)
            addSectionBtn(region, sectionElement)
            region.classList.add('completed')

            if (region.id == sessionStorage.getItem('fromGame')) {
                sessionStorage.setItem('fromGame', '') 
                addSection(sectionElement)
            }
        }
        else if (region.id == nextUnlock.id) {
            addCloseBtn(sectionElement)
            addGameBtn(region)
            region.classList.add('unlocked')
        }
        else {
            region.classList.add('locked')
        }
    });
}

function start() {
    fadeIn()
    setupRegions()
    mapContainer.addEventListener('mouseenter', mapEnter)
    mapContainer.addEventListener('mouseleave', mapLeave)
    document.body.classList.toggle("dark")
}

window.onload = function() {
    start()
    console.log('start')
}

var images = {
    portfolio: '/media/images/maps/portfolio/preview.png',
    about: '/media/images/maps/about/preview.png',
    service: '/media/images/maps/service/preview.png',
    contact: '/media/images/maps/contact/preview.png',
    home: '/media/images/maps/home/preview.png'
}

// error where map won't load map fully
// 