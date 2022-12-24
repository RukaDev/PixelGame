/*

Objectives that float around to show the path

*/

gsap.to('#inner', {
    opacity: 0,
    repeat: 0,
    duration: 4,
})

// Canvas properties
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.height = 1020
canvas.width = 1980
 
c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)


// Vars
const offset = {x: -50, y: -1550} // Player starting position on map

async function loadImages(imageUrlArray) {
    const promiseArray = []; // create an array for promises
    const imageArray = []; // array for the images

    for (let imageUrl of imageUrlArray) {

        promiseArray.push(new Promise(resolve => {

            const img = new Image();
            // if you don't need to do anything when the image loads,
            // then you can just write img.onload = resolve;

            img.onload = function() {
                // do stuff with the image if necessary

                // resolve the promise, indicating that the image has been loaded
                resolve();
            };

            img.src = imageUrl;
            imageArray.push(img);
        }));
    }

    await Promise.all(promiseArray); // wait for all the images to be loaded
    console.log("all images loaded");
    return imageArray;
}

var they = [
    '/media/images/maps/portfolio/map.png',
    '/media/images/sprites/characters/spritesheet.png',
    '/media/images/maps/portfolio/foregroundObjects.png',
    '/media/images/sprites/crystals/blue-crystal.png'
]

var image
var playerImage
var foregroundImage
var crystalImage


var player
var background
var foreground
var crystal

loadImages(they).then(images => {
    // the loaded images are in the images array
    image = images[0]
    playerImage = images[1]
    foregroundImage = images[2]
    crystalImage = images[3]

    createSprites()
    init()
})

setTimeout(() => {
    console.log('done')
}, 2000);

console.log('dioneee')

function createSprites() {
    // Sprites
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
        scale: 3.5
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
        image: crystalImage,
        frames: {
            xmax: 3,
            ymax: 1
        },
        velocity: 40,
        scale: 2
    })
    crystal.moving = true

}

var crystalZone


// Classes
const input = new Input()
const draw = new Draw()
const boundaries = new Zone(greenData)
const keyZones = new Zone(keyZoneData)
const keyDropZones = new Zone(keyDropData)
const crystalZonesAll = new Zone(crystalData)

// Updated elements
var drawnElements = []
var moveableElements = []


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

        // Collision conditions
        if (boundaries.collision(x, y)) {
            console.log('collide')
            player.moving = false 
            return
        } 

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
        repeat: 0,
        duration: 1.5,
        onComplete() {
            setArrayItem('unlocked', 'portfolio')
            sessionStorage.setItem('latest', 'portfolio')
            window.location.href = "/html/map.html"
        }
    })
}

function init() {
    // Init
    console.log('init')
    crystalZonesAll.proximitySort(player.position)

    updateCrystal()

    drawnElements = [background, crystalZonesAll, crystal,  player, foreground, boundaries, keyZones, keyDropZones]
    moveableElements = [background, ...crystalZonesAll.zone, ...boundaries.zone, foreground, ...keyDropZones.zone, ...keyZones.zone]


    window.addEventListener('keydown', function(e) {
    input.keydown(e)
    })
    window.addEventListener('keyup', function(e) {
    input.keyup(e)
    })
    animate()
}

