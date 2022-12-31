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
*/




function startGame(player, crystals, enemies) {

    const input = Input.getInstance()
    const canvas = Canvas.getInstance()

    // Core loop
    function step() {
        const animId = window.requestAnimationFrame(step)

        // Update objects
        Enemy.move(enemies)
        Crystal.reached(crystals)
    
        // Attack
        if (input.isPressed(input.binds.attack) && player.canAttack()) {
            player.attack(enemies)
        } 

        // Movement
        if (input.isPressed(input.binds.walk) && player.canMove()) {
            player.move()
        } else {
            player.stop()
        }

        // Display
        canvas.drawElements()
    }

    step()
}

function setupGame(images) {
    // Zones
    var boundaryZone = new Zone(boundaryData)
    var enemyZone = new Zone(enemyData)
    var crystalZone = new Zone(crystalData)

    // Enemies
    var enemy1 = new Enemy(images.player)
    var enemy2 = new Enemy(images.player)
    var enemy3 = new Enemy(images.player)
    var enemies = [enemy1, enemy2, enemy3]
    enemyZone.assignBoundaries(enemies, Canvas.instance.center)
    
    // Crystals
    var crystal1 = new Crystal(images.crystal)
    var crystals = [crystal1]
    crystalZone.assignBoundaries(crystals, Canvas.instance.center)

    // Player
    var player = new Player({
        boundaryZones: [boundaryZone], 
        playerImage: images.player,
        attackImage: images.attackPlayer
    })

    startGame(player, crystals, enemies)
}




