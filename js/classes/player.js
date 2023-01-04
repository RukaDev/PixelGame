class Player {

    static speed = 3

    static keyConfig = {
        w: {
            positions: {
                y: 1,
            },
            yval: 3
        },
        a: {
            positions: {
                x: 1,
            },
            yval: 1
        },
        s: {
            positions: {
                y: -1,
            },
            yval: 0
        },
        d: {
            positions: {
                x: -1,
            },
            yval: 2
        },
    }

    constructor({boundaryZones, mobZones, playerImage, attackImage}) {
        var canvas = document.querySelector('canvas')

        // Sprites
        this.playerSprite = new Sprite({
            position: {
                // 192 x 86 character dimensions
                x: (canvas.width / 2 - playerImage.width / 8 + 40), // For centering char in middle of the screen
                y: (canvas.height / 2 - playerImage.height / 2)
            },
            image: playerImage,
            frames: {
                xmax: 3,
                ymax: 4
            },
            scale: 3.5,

        })

        if (attackImage) {
            this.attackSprite = new Sprite({
                position: this.playerSprite.position,
                image: attackImage,
                frames: {
                    xmax: 3,
                    ymax: 4
                },
                scale: 3.5,
                stop: true,
                invis: true
            })
            this.attacking = false
            this.attackSprite.stopCallback = this.attackFinished.bind(this)
        }

        // Zones
        this.zoneCollisions = boundaryZones
        this.mobZones = mobZones
        
        Player.instance = this
    }

    static getInstance() {
        if (!Player.instance) {
            Player.instance = new Player('')
        }
        return Player.instance
    }

    animate(lastKey) {
        this.playerSprite.frames.yval = Player.keyConfig[lastKey].yval
        this.playerSprite.moving = true
    }

    stop() {
        this.playerSprite.moving = false
    }

    canAttack() {
        return !this.attacking
    }

    calculatePosition(lastKey) {
        return {
            x: (Player.keyConfig[lastKey].positions.x * Player.speed) || 0,
            y: (Player.keyConfig[lastKey].positions.y * Player.speed) || 0
        }
    }

    canMove(x, y) {
        if (this.zoneCollisions.some(zone => {
            return (zone.collision(this.playerSprite, x, y))
        })) {
            this.playerSprite.moving = false
        } else {
            return true
        }
    }

    attackFinished() {
        this.attacking = false
        this.playerSprite.frames.xval = 1
        Canvas.instance.drawn.push(this.playerSprite)
        removeFromArray(Canvas.instance.drawn, this.attackSprite)
    }

    attack(enemies) {
        enemies.forEach(enemy => {
            if (distance(enemy.sprite.position, this.playerSprite.position) < 200) {
                enemy.cleanup(enemies)
            }
        })

        // Animate attack
        this.attacking = true
        this.attackSprite.frames = this.playerSprite.frames
        this.attackSprite.frames.elapsed = 0
        this.attackSprite.frames.xval = 0
        this.attackSprite.frames.yval = this.playerSprite.frames.yval
        this.attackSprite.moving = true

        // Update draw elements
        Canvas.instance.drawn.push(this.attackSprite)
        removeFromArray(Canvas.instance.drawn, this.playerSprite)
    }

}