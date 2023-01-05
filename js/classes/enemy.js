class Enemy {
    
    static moveAll(enemies) {
        enemies.forEach(enemy => {
            if (enemy.canMove()) {
                enemy.move()
            }
        })
    }
    
    constructor(img) {
        this.sprite = new Sprite({
            image: img,
            frames: {
                xmax: 3,
                ymax: 4
            },
            scale: 3.5,
            moveable: true
        })
        this.moving = false
        this.horizontal()
    }

    vertical() {
        this.movex = 0
        this.movey = 1
        this.intervalId = setInterval(function() {
            if (this.moving) {
                this.sprite.moving = false
            } else {
                this.sprite.moving = true
                this.movey *= -1
                var dir = (this.movey === -1) ? 3 : 0
                this.sprite.frames.yval = dir
            }
        }.bind(this), 1500)
    }

    horizontal() {
        this.movex = 1
        this.movey = 0
        this.intervalId = setInterval(function() {
            if (this.moving) {
                this.sprite.moving = false
            } else {
                this.sprite.moving = true
                this.movex *= -1
                var dir = (this.movex === -1) ? 2 : 0
                this.sprite.frames.xval = dir
            }
        }.bind(this), 1500)
    }

    cleanup(enemys) {
        clearInterval(this.intervalId)
        Canvas.instance.removeElement(this.sprite)
        Canvas.instance.removeElement(this.boundary)
        this.boundary.cleanup()
        removeFromArray(enemys, this)
        deleteObject(this)
    }

    canMove() {
        return this.sprite.moving
    }

    move() {
        Canvas.instance.manualMoveElement(this.sprite, this.movex, this.movey)
        Canvas.instance.manualMoveElement(this.boundary, this.movex, this.movey)
    }
}