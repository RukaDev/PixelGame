/*

Traps

*/

function endGame(animId) {
    window.cancelAnimationFrame(animId)
    fade.out(1.5, function() {
        setArrayItem('unlocked', 'portfolio')
        sessionStorage.setItem('fromGame', 'portfolio')
        history.back()
    })
}

function startGame(player, traps, crystal) {

    // Core loop
    function step() {
        const animId = window.requestAnimationFrame(step)

        if (fps.advance()) {

            Trap.reached(traps, player.playerSprite.position) 

            // Crystal
            if (crystal.singleReach(player.playerSprite)) {
                endGame(animId)
            }

            // Movement
            if (input.isPressed(['w', 'a', 's', 'd'])) {
                var {x, y} = player.calculatePosition(input.lastKey)
                if (player.canMove(x, y)) {
                    player.animate(input.lastKey)
                    canvas.moveElements(x, y)
                }
            } else {
                player.stop()
            }

            canvas.drawElements()
        }
    }

    step()
}

function setupGame(images) {
    // Effect
    fade.in(4)

    // Canvas
    canvas.create(1080, 1920)

    // Config
    input.register('w')
    fps.set(75)
  
    // Sprites
    var offset = {x: -875, y: -2450}

    var backgroundSprite = new Sprite({
        position: {
            x: offset.x,
            y: offset.y
        },
        image: images.background,
        moveable: true
    })

    var foregroundSprite = new Sprite({
        position: {
            x: offset.x,
            y: offset.y
        }, 
        moveable: true,
        image: images.background,
    })

    var playerSprite = new Sprite({
        position: {
            x: (canvas.instance.width / 2 - images.player.width / 8 + 40),
            y: (canvas.instance.height / 2 - images.player.height / 2)
        },
        image: images.player,
        frames: {
            xmax: 3,
            ymax: 4
        },
        scale: 3.5,
    })

    var crystalSprite = new Sprite({
        image: images.crystal,
        frames: {xmax: 3, ymax: 1},
        velocity: 40,
        scale: 2,
        moveable: true
    })

    var trapSprite1 = new Sprite({
        image: images.spike,
        frames: {xmax: 6, ymax: 2},
        scale: 3.5,
        moveable: true
    })

    var trapSprite2 = new Sprite({
        image: images.sickle,
        frames: {xmax: 3, ymax: 4},
        scale: 3.5,
        moveable: true
    })

    var trapSprite3 = new Sprite({
        image: images.sickle,
        frames: {xmax: 3, ymax: 4},
        scale: 3.5,
        moveable: true
    })

    var trapSprite4 = new Sprite({
        image: images.sickle,
        frames: {xmax: 3, ymax: 4},
        scale: 3.5,
        moveable: true
    })

    var trapSprite5 = new Sprite({
        image: images.sickle,
        frames: {xmax: 3, ymax: 4},
        scale: 3.5,
        moveable: true
    })

    var trapSprite6 = new Sprite({
        image: images.sickle,
        frames: {xmax: 3, ymax: 4},
        scale: 3.5,
        moveable: true
    })

    var trapSprite7 = new Sprite({
        image: images.sickle,
        frames: {xmax: 3, ymax: 4},
        scale: 3.5,
        moveable: true
    })

    var trapSprite8 = new Sprite({
        image: images.sickle,
        frames: {xmax: 3, ymax: 4},
        scale: 3.5,
        moveable: true
    })

    // Level
    level.create(backgroundSprite, foregroundSprite, offset)

    // Zones
    var boundaryZone = new Zone(boundaryData)
    var trapZone = new Zone(trapData)
    var crystalZone = new Zone(crystalData)

    // Player
    var player = new Player({
        boundaryZones: [boundaryZone], 
        playerSprite: playerSprite,
    })
    
    // Crystals
    var crystal1 = new Crystal({
        boundary: crystalZone.zone[0],
        sprite: crystalSprite
    })
    
    // Sickles
    var trap1 = new Trap(trapSprite1, {interval: 800, delay: 2000}) 
    var trap2 = new Trap(trapSprite2, {interval: 3000, delay: 1000})
    var trap3 = new Trap(trapSprite3, {interval: 3000, delay: 1000})
    var trap4 = new Trap(trapSprite4, {interval: 3000, delay: 1000})
    var trap5 = new Trap(trapSprite5, {interval: 3000, delay: 1000})
    var trap6 = new Trap(trapSprite6, {interval: 3000, delay: 1000})
    var trap7 = new Trap(trapSprite7, {interval: 3000, delay: 1000})
    var trap8 = new Trap(trapSprite8, {interval: 3000, delay: 1000})
    var traps = [trap1, trap2, trap3, trap4, trap5, trap6, trap7, trap8]
    trapZone.assignBoundaries(traps, player.playerSprite.position)

    Trap.assignCallback(traps, function() {
        window.location = location
    })

    startGame(player, traps, crystal1)
}




