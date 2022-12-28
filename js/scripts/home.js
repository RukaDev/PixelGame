/*

Objectives that float around to show the path

*/


// Vars
const offset = {x: -1100, y: -2550} // Player starting position on map
var drawnElements
var moveableElements
var crystalNum = -1


// Media
var image
var playerImage
var foregroundImage
var crystalImage

function loader() {
    var imageUrls = [
        '/media/images/maps/home/map.png',
        '/media/images/sprites/characters/all.png',
        '/media/images/maps/portfolio/foreground.png',
        '/media/images/sprites/crystals/blue-crystal.png',
    ]

    loadImages(imageUrls).then(images => {
        // the loaded images are in the images array
        image = images[0]
        playerImage = images[1]
        foregroundImage = images[2]
        crystalImage = images[3]
        init()
    })
}

var player
var background
var foreground
var crystal

function createSprites() {
    const canvas = document.querySelector('canvas')

    player = new Sprite({
        position: {
            // 192 x 86 character dimensions
            x: (canvas.width / 2 - playerImage.width / 3), // For centering char in middle of the screen
            y: (canvas.height / 2 - playerImage.height / 4)
        },
        image: playerImage,
        frames: {
            xmax: 3,
            ymax: 3.975
        },
        scale: 3.5,
        customWidth: playerImage.width/8,
        customHeight: playerImage.height/4
    })

    background = new Sprite({
        position: {
            x: offset.x,
            y: offset.y
        },
        image: image,
    })

    foreground = new Sprite({
        position: {
            x: offset.x,
            y: offset.y
        },
        image: foregroundImage
    })

    crystal = new Sprite({
        image: crystalImage,
        frames: {
            xmax: 3,
            ymax: 1
        },
        velocity: 40,
        scale: 2
    })
}


var crystalZone


// Classes
const input = new Input()

var boundary 
var crystalZonesAll

function createZones() {
    boundary = new Zone(boundaryData)
    crystalZonesAll = new Zone(crystalData)
}

function updateCrystal(animationId) {
    crystalNum += 1
    if (crystalNum === crystalZonesAll.zone.length) {
        uninit(animationId)
        return
    }

    var crystalZone = crystalZonesAll.zone[crystalNum]
    console.log(crystalZone, crystalNum)
    crystal.position = crystalZone.position
}

 
// Core loop
function animate() {
    const animationId = window.requestAnimationFrame(animate)

    // Initial
    drawElements(drawnElements)
    player.moving = false
    
    // Movement
    if (input.getPressed(['w', 'a', 's', 'd'])) {
        // Update player sprite
        var key = input.lastKey
        player.frames.yval = input.keys[key].yval
        player.moving = true

        // Future position
        const speed = 3
        var x = (input.keys[key].positions.x * speed) || 0
        var y = (input.keys[key].positions.y * speed) || 0

        if (boundary.collision(x,y)) {
            console.log('boundary')
            player.moving = false
            return
        }

        if (crystalZonesAll.singleCollision(x, y, crystalNum)) {
            updateCrystal(animationId)
        }

        moveElements(moveableElements, x, y)
    }
}


function init() {
    createSprites()
    createZones()

    crystal.moving = true
    crystalZonesAll.proximitySort(player.position)
    updateCrystal()

    drawnElements = [background, boundary, crystalZonesAll, crystal,  player, foreground]
    moveableElements = [background, ...boundary.zone, ...crystalZonesAll.zone, foreground]


    animate()
}

fadeIn()
setCanvas()
loader()
