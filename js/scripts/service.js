/*

Objectives that float around to show the path

*/


function endGame(animId) {
    window.cancelAnimationFrame(animId)
    fadeOut('service')
}

function startGame(player, crystal, enemies) {

    const input = Input.getInstance()
    const canvas = Canvas.getInstance()

    // Core loop
    function step() {
        const animId = window.requestAnimationFrame(step)

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

    step()
}

function setupGame(images) {

    // Level
    new Level(
        images.background,
        images.foreground,
        {x: -210, y: -1000}
    )

    // Zones
    var boundaryZone = new Zone(boundaryData)
    var enemyZone = new Zone(enemyData)
    var crystalZone = new Zone(crystalData)

    // Sprites
    var playerSprite = new Sprite({
        position: {
            x: (Canvas.instance.canvas.width / 2 - images.player.width / 8 + 40),
            y: (Canvas.instance.canvas.height / 2 - images.player.height / 2)
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

    // Enemies
    var enemy1 = new Enemy(enemySprite1)
    var enemy2 = new Enemy(enemySprite2)
    var enemy3 = new Enemy(enemySprite3)
    var enemies = [enemy1, enemy2, enemy3]
    enemyZone.assignBoundaries(enemies, Canvas.instance.center)

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




