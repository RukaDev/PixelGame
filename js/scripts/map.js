// Elements
var mapContainer = document.querySelector('.map-container')
var pageContainer = document.querySelector('.page-container')
var sectionContainer = document.querySelector('.section-container')

var regionSpans = document.querySelectorAll('.regions span')
var section = document.querySelector('.section')

var regionCards = document.querySelectorAll('.container .card')

//sessionStorage.clear()

// if first load, setup the session storage
if (!sessionStorage.getItem('unlocked')) {
    setArray("unlocked", [])
}


var latest 

function nextUnlock() {
    var arr = getArray('unlocked')
    var amnt = arr.length
    latest = regionCards[amnt]
    setupLatest(latest)
}



nextUnlock()


console.log(regionCards)


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

// Cards
function completedEnter(region) {

}

function unlockedEnter() {
    var region = latest
    var pathway = 'url(/media/images/maps/' + region.id + '/preview.png)'
    var t = region.getElementsByClassName('face1')
    t[0].style['background-image'] = pathway
    t[0].style['background-size'] = 'cover'
}

function lockedEnter(region) {
    region.style.background.color = 'red' 
}

function unlockedLeave(region) {
    var region = latest
    var t = region.getElementsByClassName('face1')
    t[0].style.background = 'green'
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
    var t = region.getElementsByClassName('face1')
    var sectionElement = sectionContainer.querySelector('#' + region.id)

    var gameBtn = region.querySelector('#play')
    gameBtn.addEventListener('click', function() { 
        localStorage.setItem('GameName', region.id)
        var link = '/html/' + region.id + '.html'
        window.location.href = link
    })

    //region.classList.remove('locked')
    region.classList.add('unlocked')

    region.addEventListener('mouseenter', unlockedEnter)
    region.addEventListener('mouseleave', unlockedLeave)
}

function setupRegions() {
    var unlockedNames = getArray('unlocked')

    regionCards.forEach(region => {

        var t = region.getElementsByClassName('face1')

        if (unlockedNames.includes(region.id)) {
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
                localStorage.setItem('GameName', region.id)
                var link = '/html/' + region.id + '.html'
                window.location.href = link
            })

            // When we get back, if there is a new element unlocked display it
            if (region.id === sessionStorage.getItem('latest')) {
                addSection(sectionElement)
                sessionStorage.setItem('latest', '') 
            }

            region.classList.add('completed')
            t[0].style.background = 'url(/media/images/maps/' + region.id + '/preview.png)'
            t[0]
        
        } else if (region.id != latest.id) {
            region.classList.add('locked')
        }
    });
}

setupRegions()
mapContainer.addEventListener('mouseenter', mapEnter)
mapContainer.addEventListener('mouseleave', mapLeave)
