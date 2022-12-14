// Canvas properties
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.height = 1080
canvas.width = 1920
 
c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

//  boundary positioning is with the whole data file
// but the enemy and keys can be hard coded in


// Vars
const speed = 3
const offset = {x: -285, y: -400}
var lastKey = ''



// Images
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

const enemy = new Sprite({
    position: {
        x: (canvas.width / 2 - 192 / 4 / 2), 
        y: (canvas.height / 2 - 68 / 2)
    },
    image: playerUpImage,
    frames: {
        max: 4
    },
})



// Zone data
const boundaries = new Zone(collisions)
const enemyZones = new Zone(enemyData)
const moveables = [background, ...boundaries.zone, enemy, foreground, ...enemyZones.zone]

// Extra classes
const controller = new Controller()


const toDraw = [background, player, enemy, foreground, boundaries, enemyZones]

function drawer() {
    toDraw.forEach((element) => {
        element.draw()
    })
}

function removeFromArray(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
}
  

// Things that are 'static'
function drawPost() {
    moveables.forEach((moveable) => {
        moveable.position.y += y
        moveable.position.x += x
    })
}

var holding = false
function toolPickup() {
    holding = true
    toDraw.push(weaponTest)
}

function toolDrop() {
    holding = false
    removeFromArray(toDraw, weaponTest)
}

function distance(p1, p2) {
    var distance = Math.sqrt((Math.pow(p1.x-p2.x,2))+(Math.pow(p1.y-p2.y,2)))
    if (distance < 15) {
        console.log('yeah')
    }
    return distance;
}

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
            var test = enemyZones.collision()
            if (enemyZones.collision()) {
                if (!holding) {
                    distance(player.position, test.position)
                }
            }

            // have a method to get all zones that have enemies inisde
            // then check fi player and that enemy positiojn are close
            // also make it so that a player can't run over an ememy
            // so make them have collisions
            // other than that easy

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