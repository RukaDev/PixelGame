/*

Objectives that float around to show the path

*/

/*

Objectives that float around to show the path

"Scene" class that draws everything
instead of draw


*/

function endGame(animId) {
    window.cancelAnimationFrame(animId)
    fadeOut('home')
}

function startGame(player, crystal) {
    const canvas = Canvas.getInstance()
    const input = Input.getInstance()

    // Core loop
    function step() {
        const animId = window.requestAnimationFrame(step)

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

        canvas.drawElements()
    }

    step()
}

function setupGame(images) {
    // Map
    new Level(
        images.background, 
        images.foreground,
        {x: -15, y: -1600}, 
    )

    // Zones
    var boundaryZone = new Zone(boundaryData)
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
    
    var crystalSprite = new Sprite({
        image: images.crystal,
        frames: {xmax: 3, ymax: 1},
        velocity: 40,
        scale: 2,
        moveable: true
    })

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


