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
    fadeOut()
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
        {x: -300, y: -1400}, 
    )

    // Zones
    var boundaryZone = new Zone(boundaryData)
    var crystalZone = new Zone(crystalData)

    // Player
    var player = new Player({
        boundaryZones: [boundaryZone], 
        playerImage: images.player
    })

    // Crystal
    var crystal1 = new Crystal({
        image: images.crystal,
        positionZone: crystalZone
    })

    startGame(player, crystal1)
}


