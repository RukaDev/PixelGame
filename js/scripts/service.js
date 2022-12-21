/*

Attacking enemy objective
Enemies walk around and player has to defeat them to win

*/

// Canvas properties
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.height = 1080
canvas.width = 1920
 
c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)


// Vars
const offset = {x: -285, y: -400} // Player starting position
var movex = 1
var movey = 1
var moving = false


// Media
const image = new Image()
var mapimage = '/media/images/game-1/map/background.png'
image.src = mapimage

const playerDownImage = new Image()
playerDownImage.src = '/media/images/shared/player/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = '/media/images/shared/player/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = '/media/images/shared/player/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = '/media/images/shared/player/playerRight.png'

const foregroundImage = new Image()
foregroundImage.src = '/media/images/game-1/map/foregroundObjects.png'


// Sprites
const player = new Sprite({
    position: {
        // 192 x 86 character dimensions
        x: (canvas.width / 2 - 192 / 4 / 2), 
        y: (canvas.height / 2 - 68 / 2)
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        w: playerUpImage,
        a: playerLeftImage,
        d: playerRightImage,
        s: playerDownImage
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
})

const enemy2 = new Sprite({
    position: {
        x: (canvas.width / 2 - 192 / 4 / 2), 
        y: (canvas.height / 2 - 68 / 2 + (50))
    },
    image: playerUpImage,
    frames: {
        max: 4
    },
})

const enemy1 = new Sprite({
    position: {
        x: (canvas.width / 2 - 192 / 4 / 2), 
        y: (canvas.height / 2 - 68 / 2 + (100))
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
})


// Classes
const input = new Input()
const boundaries = new Zone(collisions)
const enemyZones = new Zone([enemy1, enemy2], true) 
const draw = new Draw()

// Updated elements
const drawnElements = [background, player, enemy1, enemy2, foreground, boundaries]
const moveableElements = [background, enemy1, enemy2, ...boundaries.zone, foreground]


/* Can either draw the enemies manually, or call draw on the enemy zone which will
draw all enemies for us
*/


// Core loop
function animate() {
    const animationId = window.requestAnimationFrame(animate)

    // Initial
    draw.drawElements(drawnElements)
    player.moving = false

    // Enemy movement
    if (moving) {
        draw.moveElements([enemy1, enemy2], movex, movey)
    }

    // Enemy attack
    if (enemyZones.collision()) {
        console.log('colliding')
        player.toggleMoving(false)
    } 
    
    // Player attack
    if (input.getPressed(['e'])) {
        if (enemyZones.proximity()) {
            uninit(animationId)
        }
        input.toggleOff('e') 
        return
    } 
    
    // Movement
    if (input.getPressed(['w', 'a', 's', 'd'])) {
        // Update player sprite
        var key = input.lastKey
        player.setImage(false, key)
        player.toggleMoving(true)

        // Future position
        const speed = 3
        var x = (input.keys[key].positions.x * speed) || 0
        var y = (input.keys[key].positions.y * speed) || 0

        // Collision conditions
        if (boundaries.collision(x, y)) {
            player.toggleMoving(false)
            return
        } 

        draw.moveElements(moveableElements, x, y)
    }
}


// Enemy
setInterval(function() {
    if (moving) {
        moving = false
    } else {
        moving = true
        movex = movex * -1
        movey = movey = 0
    }
}, 3000)





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
    window.addEventListener('keydown', function(e) {
    input.keydown(e)
    })
    window.addEventListener('keyup', function(e) {
    input.keyup(e)
    })
    input.addKey('e')
    animate()
}

init()

