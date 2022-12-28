/*

Objectives that float around to show the path

*/


// Global vars
const offset = {x: -50, y: -1550}
var drawnElements = []
var moveableElements = []


// Custom vars
var crystalNum = 0


// Images
var image
var playerImage
var foregroundImage
var crystalImage

function loader() {
    var imageUrls = [
        '/media/images/maps/portfolio/map.png',
        '/media/images/sprites/characters/spritesheet.png',
        '/media/images/maps/portfolio/foreground.png',
        '/media/images/sprites/crystals/blue-crystal.png'
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


// Sprites
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
            ymax: 3.9
        },
        scale: 3.5
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


// Zones
var input
var boundaries
var crystalZonesAll

function createZones() {
    input = new Input()
    boundaries = new Zone(greenData)
    crystalZonesAll = new Zone(crystalData)
}


// Core loop
function animate() {
    const animationId = window.requestAnimationFrame(animate)

    // Initial
    drawElements(drawnElements)
    player.moving = false
    
    // Movement
    if (input.getPressed(['w', 'a', 's', 'd'])) {
        // Update player anim
        var key = input.lastKey
        player.frames.yval = input.keys[key].yval
        player.moving = true

        // Future position
        const speed = 3
        var x = (input.keys[key].positions.x * speed) || 0
        var y = (input.keys[key].positions.y * speed) || 0

        // Collision 
        if (boundaries.collision(x, y)) {
            player.moving = false 
            return
        } 

        // Crystal 
        if (crystalZonesAll.singleCollision(x, y, crystalNum)) {
            crystalNum += 1
            if (crystalNum === crystalZonesAll.zone.length) {
                window.cancelAnimationFrame(animationId)
                fadeOut()
                return
            }
        
            var crystalZone = crystalZonesAll.zone[crystalNum]
            crystal.position = crystalZone.position
        }

        // Move objects
        moveElements(moveableElements, x, y)
    }
}


// Initial setup (once assets loaded)
function init() {
    // Setup
    createSprites()
    createZones()

    // Crystal 
    crystalZonesAll.proximitySort(player.position)
    crystal.position = crystalZonesAll.zone[0].position
    crystal.moving = true

    // Drawing 
    drawnElements = [background, crystalZonesAll, crystal, player, foreground, boundaries]
    moveableElements = [background, ...crystalZonesAll.zone, ...boundaries.zone, foreground]

    animate()
}


fadeIn()
setCanvas()
loader()