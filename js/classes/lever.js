class Lever {

    static activateCheck(levers, pos) {
        levers.forEach(lever => {
            if (lever.canActivate(pos)) {
                lever.activate()
            }
        }) 
    }

    constructor(sprite, callback) {
        this.sprite = sprite

        this.callback = callback
        this.activated = false
    }

    canActivate(pos) {
        return this.boundary.proximity(pos) && !this.activated
    }

    activate() {
        this.activated = true
        this.sprite.moving = true
        if (this.callback) {
            this.callback()
        }
    }
}

