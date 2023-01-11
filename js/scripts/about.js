/*

Key and bridge objective

*/

function endGame(animId) {
    window.cancelAnimationFrame(animId)
    fade.out(1.5, function() {
        setArrayItem('unlocked', 'about')
        sessionStorage.setItem('fromGame', 'about')
        history.back()
    })
}

function startGame(player, levers, crystal) {

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
            
            // Levers
            if (input.isPressed(['e'])) {
                Lever.activateCheck(levers, player.playerSprite.position)
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
    var offset = {x: -1400, y: -1400}

    var backgroundSprite = new Sprite({
        position: {
            x: offset.x,
            y: offset.y
        },
        image: images.background,
        moveable: true
    })

    var bridgeSprite1 = new Sprite({
        position: {
            x: 1,
            y: 1
        },
        image: images.bridge1,
        invis: true
    })

    var bridgeSprite2 = new Sprite({
        position: {
            x: 1,
            y: 1
        },
        image: images.bridge2,
        invis: true
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

    var leverSprite1 = new Sprite({
        image: images.lever1,
        frames: {
            xmax: 3,
            ymax: 3.975
        },
        velocity: 20,
        scale: 4,
        stop: true,
        moveable: true
    })

    var leverSprite2 = new Sprite({
        image: images.lever2,
        frames: {
            xmax: 3,
            ymax: 3.975
        },
        velocity: 20,
        scale: 4,
        stop: true,
        moveable: true
    })

    // Level
    level.create(backgroundSprite, foregroundSprite, offset)

    // Zones
    var boundaryZone = new Zone(boundaryData)
    var leverZone = new Zone(switchData)
    var bridgeZone = new Zone(bridgeData)
    var crystalZone = new Zone(crystalData)

    // Player
    var player = new Player({
        playerSprite: playerSprite,
        boundaryZones: [bridgeZone, boundaryZone], 
    })
    
    // Bridges
    var bridge1 = new Bridge(bridgeSprite1, bridgeZone, bridgeZone.zone.slice(3, 6))
    var bridge2 = new Bridge(bridgeSprite2, bridgeZone, bridgeZone.zone.slice(0, 3))
 
    // Levers
    var lever1 = new Lever(leverSprite1, bridge1.activate.bind(bridge1))
    var lever2 = new Lever(leverSprite2, bridge2.activate.bind(bridge2))
    var levers = [lever1, lever2]
    leverZone.assignBoundaries(levers, player.playerSprite.position)
 
    var crystal1 = new Crystal({
        sprite: crystalSprite,
        positionZone: crystalZone,
    })

    startGame(player, levers, crystal1)
}