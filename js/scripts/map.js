// Elements
var mapContainer
var pageContainer
var sectionContainer
var regionSpans
var section
var regionCards
var mapSpans


// Session stroage
//sessionStorage.clear()
if (!sessionStorage.getItem('unlocked')) {
    setArray("unlocked", [])
}

/* ============================== typing animation ============================ */
var typed = new Typed(".typing",{
    strings:["","Hobbyist Game Developer", "Student", "Developer"],
    typeSpeed:100,
    BackSpeed:60,
    loop:true
})


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


function initialMapCheck(e) {
    var ele = document.elementFromPoint(e.clientX, e.clientY) 
    if (mapContainer.contains(ele)) {
        mapEnter()
    }
    document.removeEventListener('mousemove', initialMapCheck)
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
        fade.out(1.5, function() {
            sessionStorage.setItem('GameName', region.id)
            window.location.href = '/html/game.html'
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
    // Loaded vars
    mapContainer = document.querySelector('.map-container')
    pageContainer = document.querySelector('.page-container')
    sectionContainer = document.querySelector('.section-container')
    regionSpans = document.querySelectorAll('.regions span')
    section = document.querySelector('.section')
    regionCards = document.querySelectorAll('.container .card')
    mapSpans = document.querySelectorAll('.map span')

    // Effect
    fade.in(4)

    // Configure locked/unlocked/completed 
    setupRegions()

    // Set the correct map image
    var ar = getArray('unlocked')
    var n = ar[ar.length-1]
    var name = n ? n : 'empty'

    mapSpans.forEach(span => {
        span.style.background = "url(/media/images/maps/overworld/" + name + ".png)"
        span.style['background-position'] =  "calc(-235px * var(--i))"
    })

    // Events
    mapContainer.addEventListener('mouseenter', mapEnter)
    mapContainer.addEventListener('mouseleave', mapLeave)
    document.addEventListener('mousemove', initialMapCheck)
    document.body.classList.toggle("dark")
}

start()


