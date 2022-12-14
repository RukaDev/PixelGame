// Elements
var mapContainer = document.querySelector('.map-container')
var pageContainer = document.querySelector('.page-container')
var sectionContainer = document.querySelector('.section-container')

var regionSpans = document.querySelectorAll('.regions span')
var section = document.querySelector('.section')

// Data
//var unlockedNames = localStorage.getItem('unlocked')
var unlockedNames = ['portfolio', 'service']

// Properties
var regionTimeout;
 
// Map 
function mapEnter() {
    mapContainer.classList.add('unfold')
    regionSpans.forEach(region => {
        region.style.visibility = 'visible'
    });
}

function mapLeave() {
    regionSpans.forEach(region => {
        region.style.visibility = 'hidden'
    });
    mapContainer.classList.remove('unfold')
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

function setupRegions() {
    regionSpans.forEach(region => {
        if (unlockedNames.includes(region.id)) {
            var sectionElement = sectionContainer.querySelector('#' + region.id)

            var gameBtn = region.querySelector('#game')
            var sectionBtn = region.querySelector('#section')
            var closeBtn = sectionElement.querySelector('#' + 'close')
            region.classList.add('unlocked')
            
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
        }
    });
}

setupRegions()
mapContainer.addEventListener('mouseenter', mapEnter)
mapContainer.addEventListener('mouseleave', mapLeave)
