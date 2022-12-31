/*

Key and door objective
Pick up a key to unlock door

*/


// Vars
const offset = {x: -1500, y: -1700} // Player starting position on map
var activated = false
var finished = false
var drawnElements
var moveableElements 



// Media
var image
var bridgeImage1
var bridgeImage2
var playerImage
var switchImage1
var switchImage2
var foregroundImage
var crystalImage

function loader() {
    var imageUrls = [
        '/media/images/maps/about/map.png',
        '/media/images/maps/about/bridge1.png',
        '/media/images/maps/about/bridge2.png',
        '/media/images/sprites/characters/spritesheet.png',
        '/media/images/sprites/switches/switch1.png',
        '/media/images/sprites/switches/switch2.png',
        '/media/images/maps/about/foreground.png',
        '/media/images/sprites/crystals/blue-crystal.png'
    ]

    loadImages(imageUrls).then(images => {
        // the loaded images are in the images array
        image = images[0]
        bridgeImage1 = images[1]
        bridgeImage2 = images[2]
        playerImage = images[3]
        switchImage1 = images[4]
        switchImage2 = images[5]
        foregroundImage = images[6]
        crystalImage = images[7]
        init()
    })
}





// Sprites
var player
var switch1
var switch2
var crystal
var background
var foreground

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
        scale: 3.5
    })
    
    switch1 = new Sprite({
        image: switchImage1,
        frames: {
            xmax: 3,
            ymax: 3.975
        },
        velocity: 20,
        scale: 4,
        stop: true
    })
    
    switch2 = new Sprite({
        image: switchImage2,
        frames: {
            xmax: 3,
            ymax: 3.975
        },
        velocity: 20,
        scale: 4,
        stop: true
    })

    crystal = new Sprite({
        position: {
            x: (canvas.width / 2), // For centering char in middle of the screen
            y: (canvas.height / 2 - 128 / 2)
        },
        image: crystalImage,
        frames: {
            xmax: 3,
            ymax: 1
        },
        velocity: 40,
        scale: 3
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
}


// Classes
const input = new Input()



// Zones
var boundaries
var switchZone1
var switchZone2
var crystalZone
var bridgeZone

function createZones() {
    boundaries = new Zone(collisions)
    switchZone1 = new Zone(switch1Data)
    switchZone2 = new Zone(switch2Data)
    crystalZone = new Zone(crystalData)
    bridgeZone = new Zone(bridgeCollision)
}




function activateBridge() {
    var img
    if (!activated) {
        activated = true
        img = bridgeImage1
        switch1.moving = true
    } else {
        img = bridgeImage2
        switch2.moving = true
        finished = true
    }
    
    const bridge = new Sprite({
        position: {
            x: background.position.x,
            y: background.position.y
        },
        image: img
    })
    drawnElements.splice(1, 0, bridge)
    moveableElements.splice(1, 0, bridge)
}



 
// Core loop
function animate() {
    const animationId = window.requestAnimationFrame(animate)

    // Initial
    drawElements(drawnElements)
    player.moving = false
    
  
    if (input.getPressed(['e'])) {
        if (switchZone1.proximity() && !activated) {
            activateBridge()
        }

        if (switchZone2.proximity()) {
            activateBridge()
        }
    }
  

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

        // Collision conditions
        if (boundaries.collision(x, y)) {
            player.moving = false 
            return
        } 

        if (bridgeZone.collision(x, y) && !finished) {
            player.moving = false
            console.log('hi')
            return
        }

        if (crystalZone.collision(x, y)) {
            window.cancelAnimationFrame(animationId)
            fadeOut()
        }

        moveElements(moveableElements, x, y)
    }
}



function init() {

    createSprites()
    createZones()

    // Init
    switch1.position = switchZone1.zone[0].position
    switch2.position = switchZone2.zone[0].position
    crystal.position = crystalZone.zone[0].position
    crystal.moving = true
    
    // Updated elements
    drawnElements = [background, bridgeZone, switchZone1, switchZone2, crystalZone, switch1, switch2, player, foreground, boundaries, crystal]
    moveableElements = [background, ...bridgeZone.zone, ...switchZone1.zone, ...switchZone2.zone, crystal, ...boundaries.zone, foreground]

    animate()
}


fadeIn()
setCanvas()
loader()