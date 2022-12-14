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
var mapimage = '/media/images/game-1/map/background.png'
image.src = mapimage

const playerDownImage = new Image()
playerDownImage.src = '/media/images/games/player/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = '/media/images/games/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = '/media/images/games/player/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = '/media/images/games/player/playerRight.png'

const foregroundImage = new Image()
foregroundImage.src = '/media/images/game-1/map/foregroundObjects.png'

// Might make the js files be thrown in there
// instead of the scripts category
// then just have the classess and helper folders still just sit in there?
// then it matches a little better with html and css
// so do i then put html, css, and js in their own area?
// why have data and classes be seperate if both are just js files?
// data will be inside of the js then, as a folder
// and i will keep the scripts folder, it just makes it better since js has so much stuff
// so html and css are just those files dumped in, and js has folders
// WHEN I GET BACK ! make it so that the 
// ! When i get back, make the css differernt style colors be in the js file instead of memeory


// Distance between two x, y positions
function calculateDistance(p1, p2) {
    var inner = (Math.pow(p1.x-p1.x,2))+(Math.pow(p1.y-p2.y,2))
    var distance = Math.sqrt(inner)
    return distance
}


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




// Zone data
const boundaries = new Zone(collisions)
const battleZones = new Zone(battleZonesData)
const moveables = [background, ...boundaries.zone, foreground, ...battleZones.zone]

// Extra classes
const controller = new Controller()

// Rendering
function drawPre() {
    background.draw()
    player.draw()
    foreground.draw()
    boundaries.draw()
    battleZones.draw()
}

function drawPost() {
    moveables.forEach((moveable) => {
        moveable.position.y += y
        moveable.position.x += x
    })
}



// Core loop
function animate() {
    const animationId = window.requestAnimationFrame(animate)

    // Setup
    drawPre()
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
            if (battleZones.collision()) {
                uninit(animationId)
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



