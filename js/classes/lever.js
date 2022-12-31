class Lever {

    static activateCheck(levers, pos) {
        levers.forEach(lever => {
            if (lever.boundary.proximity(pos)) {
                lever.animate()
                lever.callback()
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

    animate() {
        this.sprite.moving = true
    }
}

