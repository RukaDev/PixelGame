

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

    constructor(image, boundary, boundaries) {
        this.bridge = new Sprite({
            position: {
                x: 1,
                y: 1
            },
            image: image,
            invis: true
        })
    
        this.boundary = boundary
        this.boundaries = boundaries
    }

    // Set bridge
    activate() {
        this.bridge.position = {
            x:  Level.instance.background.position.x,
            y:  Level.instance.background.position.y
        }
        Canvas.instance.drawn.splice(3, 0, this.bridge)
        Canvas.instance.moveable.splice(3, 0, this.bridge)


        // Clear path, don't delete boundaries
        removeFromArrayMultiple(this.boundary.zone, this.boundaries)
    }

    // Reset bridge
    deactivate() {
        this.bridge.sprite.invis = true
        this.boundary.zone.push(...this.boundaries)
        Canvas.instance.removeElement(this.bridge) 
    }

    isActive() {
        return !this.bridge.sprite.invis
    }
}