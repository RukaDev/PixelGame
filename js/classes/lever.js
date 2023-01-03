class Lever {

    static activateCheck(levers, pos) {
        levers.forEach(lever => {
            if (lever.canActivate(pos)) {
                lever.activate()
            }
        }) 
    }

    constructor(img, callback) {
        this.sprite = new Sprite({
            image: img,
            frames: {
                xmax: 3,
                ymax: 3.975
            },
            velocity: 20,
            scale: 4,
            stop: true,
            moveable: true
        })

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

