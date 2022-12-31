/*

Objectives that float around to show the path

"Scene" class that draws everything
instead of draw


*/




function startGame(player) {

    var input = new Input()

    // Core loop
    function step() {
        Scene.ending = window.requestAnimationFrame(step)        
        Scene.drawElements()

        Sickle.reached(player.playerSprite.position) 

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
        {x: -875, y: -2450}, 
        images.background, 
        images.foreground
    )
    

    // Zones
    var boundaryZone = new Zone(boundaryData)
    var sickleZone = new Zone(sickleData)

    // Player
    var player = new Player({
        boundaryZones: [boundaryZone], 
        playerImage: images.player,
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

    sickleZone.mapPosition(
        [sickle1, sickle2, sickle3, sickle4, sickle5, sickle6, sickle7, sickle8], 
        player.playerSprite.position,
        {x: -48, y: -48}
    )
    Sickle.zone = sickleZone

    startGame(player)
}




