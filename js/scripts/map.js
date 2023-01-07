// Elements
var mapContainer
var pageContainer
var sectionContainer
var regionSpans
var section
var regionCards
var mapSpans


// Session stroage
sessionStorage.clear()
if (!sessionStorage.getItem('unlocked')) {
    setArray("unlocked", ['home', 'about', 'service', 'portfolio', 'contact'])
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
    mapContainer = document.querySelector('.map-container')
    pageContainer = document.querySelector('.page-container')
    sectionContainer = document.querySelector('.section-container')
    regionSpans = document.querySelectorAll('.regions span')
    section = document.querySelector('.section')
    regionCards = document.querySelectorAll('.container .card')
    mapSpans = document.querySelectorAll('.map span')



    fadeIn()
    setupRegions()

    var ar = getArray('unlocked')
    var n = ar[ar.length-1]
    
    var name = n ? n : 'empty'
    
    

    mapSpans.forEach(span => {
        span.style.background = "url(/media/images/maps/overworld/" + name + ".png)"
        span.style['background-position'] =  "calc(-235px * var(--i))"
    })

    mapContainer.addEventListener('mouseenter', mapEnter)
    mapContainer.addEventListener('mouseleave', mapLeave)
    document.body.classList.toggle("dark")
}

window.onload = function() {
    start()
}

