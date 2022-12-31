/*

Objectives that float around to show the path

*/


// Vars
const offset = {x: -900, y: -2500} // Player starting position on map
var moving = false
var movex = 0
var movey = 0
var attacking = false
var sickles = []
var drawnElements 
var moveableElements




var image
var playerImage
var crystalImage
var sickleImage

function loader() {
    var imageUrls = [
        '/media/images/maps/contact/map.png',
        '/media/images/sprites/characters/all.png',
        '/media/images/sprites/crystals/blue-crystal.png',
        '/media/images/sprites/traps/sickle.png'
    ]

    loadImages(imageUrls).then(images => {
        // the loaded images are in the images array
        image = images[0]
        playerImage = images[1]
        crystalImage = images[2]
        sickleImage = images[3]
        init()
    })
}


function createSprites() {
    const canvas = document.querySelector('canvas')

    player = new Sprite({
        position: {
            // 192 x 86 character dimensions
            x: (canvas.width / 2 - playerImage.width / 8 + 40), // For centering char in middle of the screen
            y: (canvas.height / 2 - playerImage.height / 4 + 40)
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

    crystal = new Sprite({
        image: crystalImage,
        position: {
            x: player.position.x,
            y: player.position.y
        },
        frames: {
            xmax: 3,
            ymax: 1
        },
        velocity: 40,
        scale: 2
    })
}


// Classes
const input = new Input()



var boundaries 
var sickleZones
var crystalZones

function createZones() {
    boundaries = new Zone(collisionData)
    sickleZones = new Zone(sickleData)
    crystalZone = new Zone(crystalData)
}



var sickleMap = new Map()

// map the boundaries to an enemy
// sort it for it to be consistent
function spawnSickles() {
    sickleZones.proximitySort(player.position)
    for (var i = 0; i < sickleZones.zone.length; i++) {
        const sickle = new Sprite({
            image: sickleImage,
            frames: {
                xmax: 3,
                ymax: 3.975
            },
            scale: 3.5
        })
        if (Math.random() > 0.5) {
            sickle.moving = true
        }
        sickle.frames.yval = 1
        sickleMap.set(sickleZones.zone[i], sickle)
        sickle.position = {
            x: sickleZones.zone[i].position.x - 48,
            y: sickleZones.zone[i].position.y - 48
        } 

        drawnElements.push(sickle)
        moveableElements.push(sickle)
        sickles.push(sickle)
    }
}



function attackFinished() {
    drawnElements.pop()
    drawnElements.push(player)
    player.frames.xval = 1
    attacking = false
}



 
// Core loop
function animate() {
    const animationId = window.requestAnimationFrame(animate)

    // Initial
    drawElements(drawnElements)
    player.moving = false

    if (sickleZones.collision()) {
        // Kill player, reset them at the start pos
        var zone = sickleZones.proximity(200) // return the sprite
        var enemy = sickleMap.get(zone)
        if (enemy.moving) {
            console.log('restart plr')
            location.reload()
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
            console.log('collide')
            player.moving = false 
            return
        } 

        if (crystalZone.collision(x, y)) {
            window.cancelAnimationFrame(animationId)
            fadeOut()
        }

        moveElements(moveableElements, x, y)
    }
}

function sickleOn() {

}

function sickleOff() {

}

function setMovement() {
    var iter = 0
    setInterval(function() {
        sickles[iter].moving = !sickles[iter].moving
        if (iter === sickles.length-1) {
            iter = 0
        } else {
            iter++
        }
    }, 400)
}


function init() {
    createSprites()
    createZones()

    drawnElements = [background, crystalZone, sickleZones, boundaries, crystal,  player]
    moveableElements = [background, ...crystalZone.zone, ...boundaries.zone, ...sickleZones.zone]


    setMovement()
    spawnSickles()

    crystal.position = crystalZone.zone[0].position
    crystal.moving = true

    animate()
}

fadeIn()
setCanvas()
loader()

