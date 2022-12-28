/*

Objectives that float around to show the path

*/


// Vars
const offset = {x: -420, y: -1000} // Player starting position on map
var drawnElements
var moveableElements
var moving = false
var movex = 0
var movey = 1
var attacking = false
 

// Media
var image
var playerImage
var foregroundImage
var crystalImage
var attackPlayerImage

function loader() {
    var imageUrls = [
        '/media/images/maps/service/map.png',
        '/media/images/sprites/characters/all.png',
        '/media/images/maps/service/foreground.png',
        '/media/images/sprites/crystals/blue-crystal.png',
        '/media/images/sprites/characters/attacksheet.png'
    ]

    loadImages(imageUrls).then(images => {
        // the loaded images are in the images array
        image = images[0]
        playerImage = images[1]
        foregroundImage = images[2]
        crystalImage = images[3]
        attackPlayerImage = images[4]
        init()
    })
}

var player
var attackPlayer
var background
var foreground
var crystal
var enemy1
var enemy2
var enemy3

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
        scale: 3.5,
        customWidth: playerImage.width/8,
        customHeight: playerImage.height/4
    })
    
    attackPlayer = new Sprite({
        position: player.position,
        image: attackPlayerImage,
        frames: {
            xmax: 3,
            ymax: 4
        },
        scale: 3.5,
        stop: true,
        
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

    enemy1 = new Sprite({
        image: playerImage,
        image: playerImage,
        frames: {
            xmax: 3,
            ymax: 3.975
        },
        scale: 3.5,
        customWidth: playerImage.width/8,
        customHeight: playerImage.height/4
    })
    
    enemy2 = new Sprite({
        image: attackPlayerImage,
        image: playerImage,
        frames: {
            xmax: 3,
            ymax: 3.975
        },
        scale: 3.5,
        customWidth: playerImage.width/8,
        customHeight: playerImage.height/4
    })
    
    enemy3 = new Sprite({
        image: playerImage,
        frames: {
            xmax: 3,
            ymax: 3.975
        },
        scale: 3.5,
        customWidth: playerImage.width/8,
        customHeight: playerImage.height/4
    })
}


// Sprites
var enemies



// Classes
const input = new Input()

var boundaries
var mobZones
var crystalZone

function createZones() {
    boundaries = new Zone(iceCollision)
    mobZones = new Zone(enemyData)
    crystalZone = new Zone(crystalData)
}


var enemyMap = new Map()

function spawnEnemies() {
    enemies = [enemy1, enemy2, enemy3]
    mobZones.proximitySort(player.position)
    for (var i = 0; i < mobZones.zone.length; i++) {
        enemyMap.set(mobZones.zone[i], enemies[i])
        enemies[i].position = {
            x: mobZones.zone[i].position.x,
            y: mobZones.zone[i].position.y
        } 
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

    if (moving) {
        moveElements(enemies, movex, movey)
    }
    
    // Player attack
    if (input.getPressed(['e'])) {
        
        if (attacking) {
            return
        }

        if (mobZones.proximity()) {
            var zone = mobZones.proximity() // return the sprite
            var enemy = enemyMap.get(zone)
            removeFromArray(mobZones.zone, zone)
            removeFromArray(enemies, enemy)
            removeFromArray(drawnElements, enemy)
        }

        attacking = true
        attackPlayer.frames = player.frames
        attackPlayer.frames.elapsed = 0
        attackPlayer.frames.xval = 0
        attackPlayer.frames.yval = player.frames.yval
        removeFromArray(drawnElements, player)


        drawnElements.push(attackPlayer)
        attackPlayer.moving = true
        
        input.toggleOff('e') 
        return
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

        if (crystalZone.collision(x, y)) {
            window.cancelAnimationFrame(animationId)
            fadeOut()
        }

        // Collision conditions
        if (boundaries.collision(x, y)) {
            console.log('collide')
            player.moving = false 
            return
        } 

        moveElements(moveableElements, x, y)
    }
}


function changeRotation(val) {
    enemies.forEach(enemy => {
        enemy.frames.yval = val
    });
}

function toggleMovement(val) {
    enemies.forEach(enemy => {
        enemy.moving = val
    })
    moving = val
}

function setMovement() {
    setInterval(function() {
        if (moving) {
            toggleMovement(false)
        } else {
            toggleMovement(true)
            movey *= -1
            var dir = (movey === -1) ? 3 : 0
            changeRotation(dir)
        }
    }, 1500)
}


function init() {
    createSprites()
    createZones()
    spawnEnemies()
    setMovement()

    attackPlayer.stopCallback = attackFinished
    crystal.moving = true
    crystal.position = crystalZone.zone[0].position

    drawnElements = [background, mobZones, crystalZone, ...enemies, boundaries, crystal, player, foreground]
    moveableElements = [background, ...crystalZone.zone, ...mobZones.zone, ...boundaries.zone, ...enemies, foreground]

    animate()
}

fadeIn()
setCanvas()
loader()

