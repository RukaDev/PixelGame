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
const offset = {x: -50, y: -1550} // Player starting position on map


// Media
const image = new Image()
image.src = '/media/images/maps/home/map.png'

const playerImage = new Image()
playerImage.src = '/media/images/sprites/characters/spritesheet.png'

const foregroundImage = new Image()
foregroundImage.src = '/media/images/maps/portfolio/foregroundObjects.png'

const crystalImage = new Image()
crystalImage.src = '/media/images/sprites/crystals/blue-crystal.png'


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
    scale: 3.5
})


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
    frames: {
        xmax: 3,
        ymax: 1
    },
    velocity: 40,
    scale: 2
})
crystal.moving = true

var crystalZone


// Classes
const input = new Input()
const draw = new Draw()
const crystalZonesAll = new Zone(crystalData)

// Updated elements
const drawnElements = [background, crystalZonesAll, crystal,  player, foreground]
const moveableElements = [background, ...crystalZonesAll.zone, foreground]


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

var crystalNum = -1
crystalZonesAll.proximitySort(player.position)

function updateCrystal(animationId) {
    crystalNum += 1
    if (crystalNum === crystalZonesAll.zone.length) {
        uninit(animationId)
        return
    }

    var crystalZone = crystalZonesAll.zone[crystalNum]
    console.log(crystalZone, crystalNum)
    crystal.position = crystalZone.position
}

updateCrystal()


 
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
        player.frames.yval = input.keys[key].yval
        player.moving = true

        // Future position
        const speed = 3
        var x = (input.keys[key].positions.x * speed) || 0
        var y = (input.keys[key].positions.y * speed) || 0


        if (crystalZonesAll.singleCollision(x, y, crystalNum)) {
            updateCrystal(animationId)
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

