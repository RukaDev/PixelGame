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




function startGame(player, levers) {

    var input = new Input()

    // Core loop
    function step() {
        Scene.ending = window.requestAnimationFrame(step)
        Scene.drawElements()

        // Switches
        if (input.getPressed(['e'])) {
            Lever.activate(player.playerSprite.position)
        }

        // Player attack
        if (input.getPressed(['f'])) {
            player.attack()
        } 
        
        // Movement
        if (input.getPressed(['w', 'a', 's', 'd'])) {
            player.move(input.lastKey)
        } else {
            player.stop()
        }
    }

    step()
}

function setupGame(images) {
    // Sets the canvas + bg + fg
    Scene.canvas()
    Scene.set(
        {x: -875, y: -2650}, 
        images.background, 
        images.foreground
    )
    
    // Zones
    var boundaryZone = new Zone(boundaryData)
    var leverZone = new Zone(switchData)
    var enemyZone = new Zone(enemyData)
    var sickleZone = new Zone(sickleData)
    var bridgeZone = new Zone(bridgeBoundaryData)

    // Player
    var player = new Player({
        boundaryZones: [bridgeZone, boundaryZone], 
        mobZones: enemyZone, 
        playerImage: images.player,
        attackImage: images.attackPlayer
    })

    // Enemies
    var enemy1 = new Enemy(images.player)
    var enemy2 = new Enemy(images.player)
    var enemy3 = new Enemy(images.player)
    Enemy.map = enemyZone.mapPosition([enemy1, enemy2, enemy3], player.playerSprite.position)
    Enemy.zone = enemyZone
    
    // Bridges
    var bridge1 = new Bridge(images.bridge1, bridgeZone, bridgeZone.zone.slice(3, 6))
    var bridge2 = new Bridge(images.bridge2, bridgeZone, bridgeZone.zone.slice(0, 3))
 
    // Levers
    var lever1 = new Lever(images.lever1, bridge1.activate.bind(bridge1))
    var lever2 = new Lever(images.lever1, bridge2.activate.bind(bridge2))
    Lever.map = leverZone.mapPosition([lever1, lever2], player.playerSprite.position)
    Lever.zone = leverZone

    startGame(player)
}




