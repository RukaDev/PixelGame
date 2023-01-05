// For spike traps

class Spike {

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

    constructor({img, frame, timing}) {

        this.sprite = new Sprite({
            image: img,
            frames: frame,
            scale: 3.5,
            moveable: true
        })
        this.sprite.moving = true
        this.sprite.frames.yval = 1
        this.sprite.frames.xval = 0
        this.stop = true
        this.setMovement(timing.interval, timing.delay)
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
    setMovement(intervalLength, delayLength) {
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