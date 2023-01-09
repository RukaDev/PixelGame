

class Sprite {

    constructor({position, invis, moveable, stop, velocity = 10, image, frames = {xmax: 1, ymax: 1}, sprites, scale = 1}) {
        this.position = position
        this.image = image
        this.frames = {...frames, xval: 0, yval: 0, elapsed: 0}
        this.moving = false
        this.sprites = sprites
        this.velocity = velocity
        this.scale = scale
        this.width = this.image.width / this.frames.xmax
        this.height = this.image.height / this.frames.ymax
        this.scaledWidth = this.width * this.scale
        this.scaledHeight = this.height * this.scale
        this.stop = stop
        
        if (!invis) {
            canvas.drawn.push(this)
        }
        if (moveable) {
            canvas.moveable.push(this)
        }
    }

    draw() {
        canvas.ctx.drawImage(
            this.image,
            this.frames.xval * this.width,
            this.frames.yval * this.height,
            this.width,
            this.height, 
            this.position.x,
            this.position.y,
            this.scaledWidth,
            this.scaledHeight
        )

        if (!this.moving) return  

        if (this.frames.xmax > 1) {
            this.frames.elapsed++
        }

        if (this.frames.elapsed % this.velocity === 0) {
            if (this.frames.xval === this.frames.xmax - 1) {
                if (this.stop) {
                    this.moving = false
                    if (this.stopCallback) {
                        this.stopCallback()
                    }
                    return
                }
            }
            
            if (this.frames.xval < this.frames.xmax - 1) {
                this.frames.xval++
            } else {
                this.frames.xval = 0
            }
        }
    }

    sheetLocation() {
        var x_center = x.position + (this.width / this.frames.xmax)
        var y_center = y.position + (this.height / this.frames.ymax)
        return {
            x: x_center,
            y: y_center
        }
    }
}
