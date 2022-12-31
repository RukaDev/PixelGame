class Enemy {
    
    static move(enemies) {
        enemies.forEach(enemy => {
            if (enemy.sprite.moving) {
                Canvas.instance.manualMove(enemy.sprite, enemy.movex, enemy.movey)
                Canvas.instance.manualMove(enemy.boundary, enemy.movex, enemy.movey)
            }
        });
    }
    
    constructor(img) {
        this.sprite = new Sprite({
            image: img,
            frames: {
                xmax: 3,
                ymax: 3.975
            },
            scale: 3.5,
            customWidth: img.width/8,
            customHeight: img.height/4,
            moveable: true
        })
        this.moving = false
        this.setMovement()
    }

    setMovement() {
        this.movex = 0
        this.movey = 1
        setInterval(function() {
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
}