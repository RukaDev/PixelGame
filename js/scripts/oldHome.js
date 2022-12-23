/*

Obstacles placed on the ground

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

const obstacle = new Sprite({
    position: {
        x: (canvas.width / 2 - 192 / 4 / 2), 
        y: (canvas.height / 2 - 68 / 2 + (100))
    },
    image: playerUpImage,
    frames: {
        max: 4
    },
})


// Classes
const input = new Input()
const draw = new Draw()
const boundaries = new Zone(collisions)
const obstacles = new Zone([obstacle], true)
const finish = new Zone(goal)

// Updated elements
const drawnElements = [background, player, finish, obstacle, foreground, boundaries]
const moveableElements = [background, obstacle, ...finish.zone, ...boundaries.zone, foreground]

// Drawn = things we see on the screen
// Moveable = things that remain 'in place' on the map as we move


const movementPositions = {
    obstacle: {
        dist: 400 * 10,
        time: 1000
    },
}

 
// Core loop
function animate() {
    const animationId = window.requestAnimationFrame(animate)

    // Initial
    draw.drawElements(drawnElements)
    player.moving = false

    // Move obstacles
    Object.entries(movementPositions).forEach(function([key, value]) {
        draw.moveElements([obstacle], value.speed, 0)
    });

    // Obstacle collisions
    if (obstacles.collision()) {
        player.toggleMoving(false)
    } 

    // Enter finish line
    if (finish.collision()) {
        uninit(animationId)
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


Object.entries(movementPositions).forEach(function([key, value]) {
    value.speed = value.dist / value.time
    setInterval((function() {
        value.speed *= -1
    }), value.time);
 });



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
    animate()
}

init()

