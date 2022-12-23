/*

Objectives that float around to show the path

*/

// Canvas properties
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.height = 1020
canvas.width = 1980
 
c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)


// Vars
const offset = {x: -1100, y: -2500} // Player starting position on map


// Media
const image = new Image()
image.src = '/media/images/maps/contact/map.png'

const playerImage = new Image()
playerImage.src = '/media/images/sprites/characters/all.png'

const foregroundImage = new Image()
foregroundImage.src = '/media/images/maps/portfolio/foregroundObjects.png'

const crystalImage = new Image()
crystalImage.src = '/media/images/sprites/crystals/blue-crystal.png'

const attackPlayerImage = new Image()
attackPlayerImage.src = '/media/images/sprites/characters/attacksheet.png'

const sickleImage = new Image()
sickleImage.src = '/media/images/sprites/traps/sickle.png'

// Sprites
const player = new Sprite({
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

// 6 x 1 



const attackPlayer = new Sprite({
    position: player.position,
    image: attackPlayerImage,
    frames: {
        xmax: 3,
        ymax: 4
    },
    scale: 3.5,
    stop: true,
    
})
attackPlayer.stopCallback = attackFinished

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image,
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
})

const crystal = new Sprite({
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
crystal.moving = true

const sickle1 = new Sprite({
    image: sickleImage,
    frames: {
        xmax: 3,
        ymax: 3.975
    },
    scale: 3.5
})
sickle1.frames.yval = 1
sickle1.moving = true

const sickle2 = new Sprite({
    image: sickleImage,
    frames: {
        xmax: 3,
        ymax: 3.975
    },
    scale: 3.5
})
sickle2.frames.yval = 1


var sickles = [sickle1, sickle2]

// Classes
const input = new Input()
const draw = new Draw()
const boundaries = new Zone(greenData)
const sickleZones = new Zone(sickleData)

// Updated elements
const drawnElements = [background, sickleZones, ...sickles, crystal,  player, foreground]
const moveableElements = [background, crystal, ...sickleZones.zone, ...sickles, foreground]

/*

Options:
    All crystals visible, they disappear each time you hit one
        map all zones to their respective crystals
        when we walk over a zone get the zone, then index it with the map
        then make that crystal invisible, if it's the last crystal then end the map


    One crystal visible, new ones appear when the one is walked on
        Keep reference to the crystal and the zone
        When the zone is hit, call makecrystal func
        make crystal func sets the crytalimage to be the new zone location
        we keep the current iter of crystal pos, and have an arr of all the crystal locs
        then we remove the current crystal loc from the zone and make it the new one
        keep repeating until the last one

    bridge one:
        make it so that the actual ends of the bridge are there, but the lever
        creates the middle of the bridge for us to walk on

    
*/



var sickleMap = new Map()

// map the boundaries to an enemy
// sort it for it to be consistent
function spawnSickles() {
    sickleZones.proximitySort(player.position)
    for (var i = 0; i < sickleZones.zone.length; i++) {
        sickleMap.set(sickleZones.zone[i], sickles[i])
        sickles[i].position = {
            x: sickleZones.zone[i].position.x - 48,
            y: sickleZones.zone[i].position.y - 48
        } 
    }
}

spawnSickles()


var moving = false
var movex = 0
var movey = 0

function attackFinished() {
    drawnElements.pop()
    drawnElements.push(player)
    player.frames.xval = 1
    attacking = false
}


var attacking = false
 
// Core loop
function animate() {
    const animationId = window.requestAnimationFrame(animate)

    // Initial
    draw.drawElements(drawnElements)
    player.moving = false

    if (moving) {
        //draw.moveElements([enemy1, enemy2], movex, movey)
    }

    if (sickleZones.collision()) {
        // Kill player, reset them at the start pos
        console.log('killed')
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

        // If char turns, then the attack character needs to also turn
        // Just set the frame var of the attack char as the normal char
        // So it does it automatically
        // They might be sized differently though which will be an issue

        draw.moveElements(moveableElements, x, y)
    }
}

function sickleOn() {

}

function sickleOff() {

}

// Enemy
var iter = 0
setInterval(function() {
    sickles[iter].moving = !sickles[iter].moving

    if (iter === sickles.length-1) {
        iter = 0
    } else {
        iter++
    }
}, 1000)



// Setup and removal
function uninit(animationId) {
    window.cancelAnimationFrame(animationId)

    gsap.to('#inner', {
        opacity: 1,
        repeat: 3,
        yoyo: true,
        duration: 0.4,
        onComplete() {
            // solid black
            gsap.to('#inner', {
                opacity: 1,
                duration: 0.4,
                onComplete() {
                    localStorage.setItem('Portfolio', 'unlocked');
                    window.location.href = "/html/map.html"
                }
            })
        }
    })
}

function init() {
    // Init
    input.addKey('e')

    window.addEventListener('keydown', function(e) {
    input.keydown(e)
    })
    window.addEventListener('keyup', function(e) {
    input.keyup(e)
    })
    animate()
}

init()

