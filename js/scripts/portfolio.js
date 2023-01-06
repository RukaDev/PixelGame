/*

Objectives that float around to show the path

"Scene" class that draws everything
instead of draw


*/

function endGame(animId) {
    window.cancelAnimationFrame(animId)
    fadeOut('portfolio')
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

    var sickleSprite1 = new Sprite({
        image: images.spike,
        frames: {xmax: 6, ymax: 2},
        scale: 3.5,
        moveable: true
    })

    var sickleSprite2 = new Sprite({
        image: images.sickle,
        frames: {xmax: 3, ymax: 4},
        scale: 3.5,
        moveable: true
    })

    var sickleSprite3 = new Sprite({
        image: images.sickle,
        frames: {xmax: 3, ymax: 4},
        scale: 3.5,
        moveable: true
    })

    var sickleSprite4 = new Sprite({
        image: images.sickle,
        frames: {xmax: 3, ymax: 4},
        scale: 3.5,
        moveable: true
    })

    var sickleSprite5 = new Sprite({
        image: images.sickle,
        frames: {xmax: 3, ymax: 4},
        scale: 3.5,
        moveable: true
    })

    var sickleSprite6 = new Sprite({
        image: images.sickle,
        frames: {xmax: 3, ymax: 4},
        scale: 3.5,
        moveable: true
    })

    var sickleSprite7 = new Sprite({
        image: images.sickle,
        frames: {xmax: 3, ymax: 4},
        scale: 3.5,
        moveable: true
    })

    var sickleSprite8 = new Sprite({
        image: images.sickle,
        frames: {xmax: 3, ymax: 4},
        scale: 3.5,
        moveable: true
    })
    


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
    var sickle1 = new Sickle(sickleSprite1, {interval: 800, delay: 2000}) 
    var sickle2 = new Sickle(sickleSprite2, {interval: 3000, delay: 1000})
    var sickle3 = new Sickle(sickleSprite3, {interval: 3000, delay: 1000})
    var sickle4 = new Sickle(sickleSprite4, {interval: 3000, delay: 1000})
    var sickle5 = new Sickle(sickleSprite5, {interval: 3000, delay: 1000})
    var sickle6 = new Sickle(sickleSprite6, {interval: 3000, delay: 1000})
    var sickle7 = new Sickle(sickleSprite7, {interval: 3000, delay: 1000})
    var sickle8 = new Sickle(sickleSprite8, {interval: 3000, delay: 1000})
    var sickles = [sickle1, sickle2, sickle3, sickle4, sickle5, sickle6, sickle7, sickle8]
    sickleZone.assignBoundaries(sickles, player.playerSprite.position)

    Sickle.assignCallback(sickles, function() {
        window.location = location
    })

    startGame(player, sickles, crystal1)
}




