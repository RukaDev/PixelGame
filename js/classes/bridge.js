

/* 


Creates a bridge 

Pass the path that prevents the user from moving along the path


*/

class Bridge {

    static activateAll(bridges) {
        bridges.forEach(bridge => {
            bridge.activate()
        })
    }

    static deactivateAll(bridges) {
        bridges.forEach(bridge => {
            bridge.deactivate()
        })
    }

    constructor(sprite, boundary, boundaries) {
        this.sprite = sprite
        this.boundary = boundary
        this.boundaries = boundaries
    }

    // Set bridge
    activate() {
        this.sprite.position = {
            x:  Level.instance.background.position.x,
            y:  Level.instance.background.position.y
        }
        Canvas.instance.drawn.splice(3, 0, this.sprite)
        Canvas.instance.moveable.splice(3, 0, this.sprite)


        // Clear path, don't delete boundaries
        removeFromArrayMultiple(this.boundary.zone, this.boundaries)
    }

    // Reset bridge
    deactivate() {
        this.sprite.sprite.invis = true
        this.boundary.zone.push(...this.boundaries)
        Canvas.instance.removeElement(this.sprite) 
    }

    isActive() {
        return !this.sprite.invis
    }
}