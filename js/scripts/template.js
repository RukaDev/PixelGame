/*

Template for the areas

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



// Classes
const input = new Input()
const draw = new Draw()
const boundaries = new Zone(collisions)

// Updated elements
const drawnElements = [background, player, foreground, boundaries]
const moveableElements = [background, ...boundaries.zone, foreground]

 
// Core loop
function animate() {
    const animationId = window.requestAnimationFrame(animate)

    // Initial
    draw.drawElements(drawnElements)
    player.moving = false
    
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

