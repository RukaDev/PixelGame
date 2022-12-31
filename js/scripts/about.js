/*

Key and door objective
Pick up a key to unlock door

*/

function endGame(animId) {
    window.cancelAnimationFrame(animId)
    fadeOut()
}

function startGame(player, levers, crystal) {
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

    step()
}

function setupGame(images) {
    // Sets the canvas + bg + fg
    new Level(
        images.background,
        images.foreground,
        {x: -1400, y: -1400}
    )

    // Zones
    var boundaryZone = new Zone(boundaryData)
    var leverZone = new Zone(switchData)
    var bridgeZone = new Zone(bridgeData)
    var crystalZone = new Zone(crystalData)

    // Player
    var player = new Player({
        boundaryZones: [bridgeZone, boundaryZone], 
        playerImage: images.player,
    })
    
    // Bridges
    var bridge1 = new Bridge(images.bridge1, bridgeZone, bridgeZone.zone.slice(3, 6))
    var bridge2 = new Bridge(images.bridge2, bridgeZone, bridgeZone.zone.slice(0, 3))
 
    // Levers
    var lever1 = new Lever(images.lever1, bridge1.activate.bind(bridge1))
    var lever2 = new Lever(images.lever2, bridge2.activate.bind(bridge2))
    var levers = [lever1, lever2]
    leverZone.assignBoundaries(levers, player.playerSprite.position)
 
    var crystal1 = new Crystal({
        image: images.crystal, 
        positionZone: crystalZone
    })

    startGame(player, levers, crystal1)
}