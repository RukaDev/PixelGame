/*

Player attacking enemies

*/


function endGame(animId) {
    window.cancelAnimationFrame(animId)
    fade.out(1.5, function() {
        setArrayItem('unlocked', 'service')
        sessionStorage.setItem('fromGame', 'service')
        history.back()
    })
}

function startGame(player, crystal, enemies) {

    // Core loop
    function step() {
        const animId = window.requestAnimationFrame(step)

        if (fps.advance()) {

            // Update objects
            Enemy.moveAll(enemies)
            if (crystal.singleReach(player.playerSprite)) {
                endGame(animId)
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

            // Display
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

    var offset = {x: -210, y: -1000}

    // Sprites
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
        image: images.skeleton,
        frames: {
            xmax: 3,
            ymax: 4
        },
        scale: 3.5,
        moveable: true
    })

    var enemySprite2 = new Sprite({
        image: images.scorpion,
        frames: {
            xmax: 3,
            ymax: 4
        },
        scale: 3.5,
        moveable: true
    })

    var enemySprite3 = new Sprite({
        image: images.skeleton,
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

    var foregroundSprite = new Sprite({
        position: {
            x: offset.x,
            y: offset.y
        },
        image: images.foreground,
        moveable: true
    })

    // Level
    level.create(backgroundSprite, foregroundSprite, offset)

    // Zones
    var boundaryZone = new Zone(boundaryData)
    var enemyZone = new Zone(enemyData)
    var crystalZone = new Zone(crystalData)

    // Enemies
    var enemy1 = new Enemy(enemySprite1)
    var enemy2 = new Enemy(enemySprite2)
    var enemy3 = new Enemy(enemySprite3)
    var enemies = [enemy1, enemy2, enemy3]
    enemyZone.assignBoundaries(enemies, canvas.center)

    // Crystals
    var crystal1 = new Crystal({
        sprite: crystalSprite,
        boundary: crystalZone.zone[0],
    })

    // Player
    var player = new Player({
        boundaryZones: [boundaryZone], 
        playerSprite: playerSprite,
        attackSprite: attackSprite
    })

    startGame(player, crystal1, enemies)
}




