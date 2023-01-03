/*

Objectives that float around to show the path

"Scene" class that draws everything
instead of draw


*/

function endGame(animId) {
    window.cancelAnimationFrame(animId)
    fadeOut()
}

function startGame(player, sickles, crystal) {

    var canvas = Canvas.getInstance()
    var input = Input.getInstance()

    // Core loop
    function step() {
        const animId = window.requestAnimationFrame(step)        

        Sickle.reached(sickles, player.playerSprite.position) 

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

    step()
}

function setupGame(images) {
    // Sets the canvas + bg + fg
    new Level(
        images.background, 
        images.foreground,
        {x: -875, y: -2450}, 
    )
    
    // Zones
    var boundaryZone = new Zone(boundaryData)
    var sickleZone = new Zone(sickleData)
    var crystalZone = new Zone(crystalData)

    // Player
    var player = new Player({
        boundaryZones: [boundaryZone], 
        playerImage: images.player,
    })
    
    // Crystals
    var crystal1 = new Crystal({
        image: images.crystal,
        boundary: crystalZone.zone[0]
    })
    
    // Sickles
    var sickle1 = new Sickle(images.sickle) 
    var sickle2 = new Sickle(images.sickle) 
    var sickle3 = new Sickle(images.sickle) 
    var sickle4 = new Sickle(images.sickle) 
    var sickle5 = new Sickle(images.sickle) 
    var sickle6 = new Sickle(images.sickle) 
    var sickle7 = new Sickle(images.sickle)
    var sickle8 = new Sickle(images.sickle)
    var sickles = [sickle1, sickle2, sickle3, sickle4, sickle5, sickle6, sickle7, sickle8]
    sickleZone.assignBoundaries(sickles, player.playerSprite.position)

    Sickle.assignCallback(sickles, function() {
        window.location = location
    })

    startGame(player, sickles, crystal1)
}




