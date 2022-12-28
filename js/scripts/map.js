// Elements
var mapContainer = document.querySelector('.map-container')
var pageContainer = document.querySelector('.page-container')
var sectionContainer = document.querySelector('.section-container')

var regionSpans = document.querySelectorAll('.regions span')
var section = document.querySelector('.section')

var regionCards = document.querySelectorAll('.container .card')

sessionStorage.clear()


// ! Going to have to make sure to load images on here too


gsap.to('#inner', {
    opacity: 0,
    repeat: 0,
    duration: 4,
})

// if first load, setup the session storage
if (!sessionStorage.getItem('unlocked')) {
    setArray("unlocked", ["portfolio", "about", "service", "contact"])
}


var latest 

function nextUnlock() {
    var arr = getArray('unlocked')
    var amnt = arr.length
    latest = regionCards[amnt]
    setupLatest(latest)
}


nextUnlock()


// Properties
var regionTimeout;
 
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
    clearTimeout(regionTimeout)
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

// Check if we just unlocked something, if so then display it

function setupLatest(region) {
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

    region.classList.add('unlocked')
}

function setupRegions() {
    var unlockedNames = getArray('unlocked')

    regionCards.forEach(region => {

        if (unlockedNames.includes(region.id)) {
            console.log(region.id)
            var sectionElement = sectionContainer.querySelector('#' + region.id)

            var gameBtn = region.querySelector('#play')
            var sectionBtn = region.querySelector('#view')

            var closeBtn = sectionElement.querySelector('#' + 'close')
            
            sectionBtn.addEventListener('click', function() {
                addSection(sectionElement)
            })

            closeBtn.addEventListener('click', function() {
                removeSection(sectionElement)
            })

            gameBtn.addEventListener('click', function() { 
                console.log('hii')
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

            // When we get back, if there is a new element unlocked display it
            if (region.id === sessionStorage.getItem('latest')) {
                addSection(sectionElement)
                sessionStorage.setItem('latest', '') 
            }

            region.classList.add('completed')
        } else if (region.id != latest.id) {
            region.classList.add('locked')
        }
    });
}

setupRegions()
mapContainer.addEventListener('mouseenter', mapEnter)
mapContainer.addEventListener('mouseleave', mapLeave)


