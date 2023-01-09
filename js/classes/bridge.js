
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
            x:  level.bg.position.x,
            y:  level.bg.position.y
        }
        canvas.drawn.splice(1, 0, this.sprite)
        canvas.moveable.splice(1, 0, this.sprite)

        // Clear path, don't delete boundaries
        removeFromArrayMultiple(this.boundary.zone, this.boundaries)
    }

    // Reset bridge
    deactivate() {
        this.sprite.sprite.invis = true
        this.boundary.zone.push(...this.boundaries)
        canvas.removeElement(this.sprite) 
    }

    isActive() {
        return !this.sprite.invis
    }
}