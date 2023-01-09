class Boundary {
    // width and height are tile 16x16 times zoom multiplier (400% means 16*4)
    static width = 16 * 4.75
    static height = 16 * 4.75

    constructor({position, zone}) {
        this.position = position
        this.width = Boundary.width
        this.height = Boundary.height
        this.zone = zone
    }

    collision(sprite, x=0, y=0) {
        var rectangle1 = {
            position: {
                x: sprite.position.x + (-1) * x, // -1 becuase its opposite the plrs
                y: sprite.position.y + (-1) * y
            },

            width: sprite.width * sprite.scale,
            height: sprite.height * sprite.scale
        }
        var rectangle2 = this
        
        return collision(rectangle1, rectangle2)
    }

    cleanup() {
        removeFromArray(this.zone, this)
        deleteObject(this)
    }

    proximity(p1, amnt = 100) {
        return distance(p1, this.position) < amnt
    }

    inside(sprite) {
        var rectangle1 = {
            position: {
                x: sprite.position.x + x,
                y: sprite.position.y + y
            },

            width: sprite.width * sprite.scale,
            height: sprite.height * sprite.scale
        }
        var rectangle2 = this
        
        return bounded(rectangle1, rectangle2, sprite.scale)
    }

    draw() {
        canvas.ctx.fillStyle = 'red'
        canvas.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

// zone is a collection of boundaries, with helpers, but you can still get a single one easiily