/*

Objectives that float around to show the path

"Scene" class that draws everything
instead of draw

!
!Instead of setting a map, i could just add .boundary = 
to each of the objects
then pass the objects to the start game
then call a static method and pass the objects like
Enemy.move(objects)
not sure this will work actually
like for the lever one
on the update, we do a prox check to get a boundary then check the map
if i don't do that, then i'd have to check each one individually and see it it's close
that is already what i do when i call it, it checks all of them if they are close
so just a diff way to do it

start game has all the things that will be used during the game
so everything is setup already

boundaries are used as hitboxes 
differnt types of collisions can be done on them

! remember payer doesn't move, always at the center
so don't have to pass it around as much as i have been
plyaer is only ever screated once
so make it a singleton
same with the input
only objects made multiple tiles have a class


might get rid of zone class funcionality 
and put it inside of the boundaries
the zone will still have things but, mainly helpers to do on all of them

it's how i do the enemies and other things
class for the boundaries, then static helpers inside the boundary class
sio get rid of the zone

might change level name to 'scene'
*/


function endGame(animId) {
    window.cancelAnimationFrame(animId)
    fadeOut()
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

    // Enemies
    var enemy1 = new Enemy(images.skeleton)
    var enemy2 = new Enemy(images.scorpion)
    var enemy3 = new Enemy(images.skeleton)
    var enemies = [enemy1, enemy2, enemy3]
    enemyZone.assignBoundaries(enemies, Canvas.instance.center)

    // ! when assigning a boundary, boundary is in top left of sprite sheet
    // so have to offset the sprite to be at that boundary
    
    // Crystals
    var crystal1 = new Crystal({
        image: images.crystal,
        boundary: crystalZone.zone[0]
    })

    // Player
    var player = new Player({
        boundaryZones: [boundaryZone], 
        playerImage: images.player,
        attackImage: images.attackPlayer
    })

    startGame(player, crystal1, enemies)
}




