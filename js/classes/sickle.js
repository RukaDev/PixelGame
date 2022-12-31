class Sickle {

    static reached(p) {
        if (Sickle.zone.proximity(50, p)) {
            console.log('yes')
        }
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

    setMovement() {
        this.iter = 0
        this.max = 8 // num sickles
        setInterval(function() {
            this.sprite.moving = !this.sprite.moving
            if (this.iter === this.max) {
                this.iter = 0
            } else {
                this.iter++
            }
        }.bind(this), 400 * this.max)
    }

    animate() {
        this.sprite.moving = true
    }
}