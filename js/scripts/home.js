
/*

Crystals that float around to show the path

*/


function endGame(animId) {
    window.cancelAnimationFrame(animId)
    fade.out(1.5, function() {
        setArrayItem('unlocked', 'home')
        sessionStorage.setItem('fromGame', 'home')
        history.back()
    })
}

function startGame(player, crystal) {
    // Core loop
    function step() {
        const animId = window.requestAnimationFrame(step)

        if (fps.advance()) {

            // Crystal
            if (crystal.reached(player.playerSprite)) {
                if (crystal.isLast()) {
                    endGame(animId)
                } else {
                    crystal.nextPosition()
                }
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

            // Draw
            canvas.drawElements()
        }
    }

    step()
}

function setupGame(images) {

    // Effect
    fade.in(4)

    // Technical
    canvas.create(1080, 1920)
    input.register('w')
    fps.set(75)

    // Sprites
    var offset = {x: -25, y: -1600}

    var backgroundSprite = new Sprite({
        position: {
            x: offset.x,
            y: offset.y
        },
        image: images.background,
        moveable: true
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

    var foregroundSprite = new Sprite({
        position: {
            x: offset.x,
            y: offset.y
        }, 
        moveable: true,
        image: images.foreground,
    })
    
    var crystalSprite = new Sprite({
        image: images.crystal,
        frames: {xmax: 3, ymax: 1},
        velocity: 40,
        scale: 2,
        moveable: true
    })

    // Level
    level.create(backgroundSprite, foregroundSprite, offset)

    // Zones
    var boundaryZone = new Zone(boundaryData)
    var crystalZone = new Zone(crystalData)

    // Player
    var player = new Player({
        playerSprite: playerSprite,
        boundaryZones: [boundaryZone], 
        playerImage: images.player
    })

    // Crystal
    var crystal1 = new Crystal({
        sprite: crystalSprite,
        positionZone: crystalZone,
    })

    startGame(player, crystal1)
}


