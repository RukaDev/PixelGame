class Sickle {

    static reached(sickles, pos) {
        sickles.forEach(sickle => {
            sickle.hitPlayer(pos)
        });
    }

    static assignCallback(sickles, callback) {
        sickles.forEach(sickle => {
            sickle.callback = callback
        })
    }

    constructor(img) {
        this.sprite = new Sprite({
            image: img,
            frames: {
                xmax: 3,
                ymax: 3.975
            },
            scale: 3.5,
            moveable: true
        })
        this.sprite.moving = true
        this.sprite.frames.yval = 1
        this.setMovement()
    }

    isActive() {
        return this.sprite.moving
    }

    reset() {
        this.sprite.moving = false
    }

    set() {
        this.sprite.moving = true
    }

    hitPlayer(p) {
        if (this.isActive() && this.boundary.proximity(p)) {
            if (this.callback) {
                this.callback()
            }
        }
    }

    // Set active length and delay length
    setMovement(intervalLength = 3000, delayLength = 1000) {
        function thing() {
            this.reset()
            setTimeout(function() {      
                this.set()
            }.bind(this), delayLength)
        }

        thing.bind(this)()
        this.intervalId = setInterval(thing.bind(this), intervalLength + delayLength)
    }

    animate() {
        this.sprite.moving = true
    }
}