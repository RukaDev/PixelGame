/*

Objectives that float around to show the path

"Scene" class that draws everything
instead of draw



Don't have the enemies thing inside the attack from the player
pass the enemies to it as a paramter 


if player.canAttack() {
    player.attack(enemies)
}

if player.canMove() {
    player.move(input.lastKey)
}

if Lever.checkActivation(levers) {

}


passing params and not just a map gives more control so i will do that

all things must be created in the start game area
then the game loop just sets them up
*/


function endGame(animId) {
    window.cancelAnimationFrame(animId)
    fadeOut()
}


function startGame(player, levers, enemies, crystal) {

    const canvas = Canvas.getInstance()
    const input = Input.getInstance()

    // Core loop
    function step() {
        const animId = window.requestAnimationFrame(step)

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

    step()
}

function setupGame(images) {
    // Sets the bg + fg
    new Level(
        images.background,
        images.foreground,
        {x: -875, y: -2650}, 
    )

    
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
        playerImage: images.player,
        attackImage: images.attackPlayer
    })

    // Enemies
    var enemy1 = new Enemy(images.bull)
    var enemy2 = new Enemy(images.fireSkeleton)
    var enemy3 = new Enemy(images.fireSkeleton)
    var enemies = [enemy1, enemy2, enemy3]
    enemyZone.assignBoundaries(enemies, player.playerSprite)

    // Bridges
    var bridge1 = new Bridge(images.bridge1, bridgeZone, bridgeZone.zone.slice(3, 6))
    var bridge2 = new Bridge(images.bridge2, bridgeZone, bridgeZone.zone.slice(0, 3))
 
    // Levers
    var lever1 = new Lever(images.lever1, bridge1.activate.bind(bridge1))
    var lever2 = new Lever(images.lever1, bridge2.activate.bind(bridge2))
    var levers = [lever1, lever2]
    leverZone.assignBoundaries(levers, player.playerSprite.position)

    //! Make sickles then done

    // Crystal
    var crystal1 = new Crystal({
        image: images.crystal,
        boundary: crystalZone.zone[0]
    })

    startGame(player, levers, enemies, crystal1)
}




