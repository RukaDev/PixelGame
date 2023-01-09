class Trap {

    static reached(traps, pos) {
        traps.forEach(trap => {
            trap.hitPlayer(pos)
        });
    }

    static assignCallback(traps, callback) {
        traps.forEach(trap => {
            trap.callback = callback
        })
    }

    constructor(sprite, timing) {
        this.sprite = sprite
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