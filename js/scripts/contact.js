/*

Final level with many additions

*/


function endGame(animId) {
    window.cancelAnimationFrame(animId)
    fade.out(1.5, function() {
        setArrayItem('unlocked', 'contact')
        sessionStorage.setItem('fromGame', 'contact')
        history.back()
    })
}

function startGame(player, levers, enemies, crystal) {
    // Core loop
    function step() {
        const animId = window.requestAnimationFrame(step)

        if (fps.advance()) {

            Enemy.moveAll(enemies)

            // Crystal
            if (crystal.singleReach(player.playerSprite)) {
                endGame(animId)
            }

            // Levers
            if (input.isPressed(['e'])) {
                Lever.activateCheck(levers, player.playerSprite.position)
            }

            // Attack
            if (input.isPressed(['f']) && player.canAttack()) {
                player.attack(enemies)
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
  
    var offset = {x: -875, y: -2550}
    
    // Sprites
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

    var foregroundSprite = new Sprite({
        position: {
            x: offset.x,
            y: offset.y
        },
        image: images.lever1,
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

    var attackSprite = new Sprite({
        position: {
            x: playerSprite.position.x - 27.5,
            y: playerSprite.position.y - 5
        },
        image: images.attackPlayer,
        frames: {
            xmax: 3,
            ymax: 4
        },
        scale: 3.5,
        stop: true,
        invis: true
    })

    var enemySprite1 = new Sprite({
        image: images.fireSkeleton,
        frames: {
            xmax: 3,
            ymax: 4
        },
        scale: 3.5,
        moveable: true
    })

    var enemySprite2 = new Sprite({
        image: images.fireSkeleton,
        frames: {
            xmax: 3,
            ymax: 4
        },
        scale: 3.5,
        moveable: true
    })

    var enemySprite3 = new Sprite({
        image: images.bull,
        frames: {
            xmax: 3,
            ymax: 4
        },
        scale: 3.5,
        moveable: true
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

    // Level
    level.create(backgroundSprite, foregroundSprite, offset)

    // Zones
    var boundaryZone = new Zone(boundaryData)
    var leverZone = new Zone(switchData)
    var enemyZone = new Zone(enemyData)
    var sickleZone = new Zone(sickleData)
    var bridgeZone = new Zone(bridgeBoundaryData)
    var crystalZone = new Zone(crystalData)

    // Player
    var player = new Player({
        boundaryZones: [bridgeZone, boundaryZone], 
        mobZones: enemyZone, 
        playerSprite: playerSprite,
        attackSprite: attackSprite
    })

    // Enemies
    var enemy1 = new Enemy(enemySprite1)
    var enemy2 = new Enemy(enemySprite2)
    var enemy3 = new Enemy(enemySprite3)
    var enemies = [enemy1, enemy2, enemy3]
    enemyZone.assignBoundaries(enemies, player.playerSprite.position)

    // Bridges
    var bridge1 = new Bridge(bridgeSprite1, bridgeZone, bridgeZone.zone.slice(3, 6))
    var bridge2 = new Bridge(bridgeSprite2, bridgeZone, bridgeZone.zone.slice(0, 3))
 
    // Levers
    var lever1 = new Lever(leverSprite1, bridge1.activate.bind(bridge1))
    var lever2 = new Lever(leverSprite2, bridge2.activate.bind(bridge2))
    var levers = [lever1, lever2]
    leverZone.assignBoundaries(levers, player.playerSprite.position)

    // Crystal
    var crystal1 = new Crystal({
        sprite: crystalSprite,
        boundary: crystalZone.zone[0],
    })

    startGame(player, levers, enemies, crystal1)
}




