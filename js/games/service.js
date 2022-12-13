// Canvas properties
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.height = 1080
canvas.width = 1920
 
c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)



// Vars
const speed = 3
const offset = {x: -285, y: -400}
var lastKey = ''



// Images
const image = new Image()
var mapimage = '/img/background/' + localStorage.getItem('GameName') + '.png'
image.src = mapimage

const playerDownImage = new Image()
playerDownImage.src = '/img/player/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = '/img/player/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = '/img/player/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = '/img/player/playerRight.png'

const foregroundImage = new Image()
foregroundImage.src = '/img/foreground/foregroundObjects.png'

const weapon = new Image()
weapon.src = '/img/tools/embySprite2.png'



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

const weaponTest = new Sprite({
    position: {
        // 192 x 86 character dimensions
        x: player.position.x, 
        y: player.position.y
    },
    image: weapon,
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


// Zone data
const boundaries = new Zone(collisions)
const keyZones = new Zone(keyZoneData)
const moveables = [background, ...boundaries.zone, foreground, ...keyZones.zone]

// Extra classes
const controller = new Controller()

// Rendering
function drawPre() {
    background.draw()
    player.draw()
    weaponTest.draw()
    foreground.draw()
    boundaries.draw()
    keyZones.draw()
}

const toDraw = [background, player, foreground, boundaries, keyZones]

function drawer() {
    toDraw.forEach((element) => {
        element.draw()
    })
}

// Things that are 'static'
function drawPost() {
    moveables.forEach((moveable) => {
        moveable.position.y += y
        moveable.position.x += x
    })
}

var found = false

// Core loop
function animate() {
    const animationId = window.requestAnimationFrame(animate)

    // Setup
    //drawPre()
    drawer()

 
    player.moving = false

    for (var key in keys) {
        if (keys[key].pressed && lastKey === key) {

            // Update player
            player.image = player.sprites[key]
            player.moving = true

            // Collision check
            x = (keys[key].positions.x * speed) || 0
            y = (keys[key].positions.y * speed) || 0
            if (boundaries.collision(x, y)) {
                player.moving = false
                return
            }

            // Zone check
            if (keyZones.collision()) {
                if (found) {
                    drawPost()
                    return
                }
                found = true

                toDraw.push(weaponTest)

                //uninit(animationId)
            }

            drawPost()
        }
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
    console.log('inited')
    window.addEventListener('keydown', controller.keydown)
    window.addEventListener('keyup', controller.keyup)
    animate()
}

init()