class Sprite {
    constructor({position, customWidth, customHeight, stop, velocity = 10, image, frames = {xmax: 1, ymax: 1}, sprites, scale = 1}) {
        this.position = position
        this.image = image
        this.frames = {...frames, xval: 0, yval: 0, elapsed: 0}
        this.moving = false
        this.sprites = sprites
        this.velocity = velocity
        this.customWidth = customWidth || this.image.width,
        this.customHeight = customHeight || this.image.height
        this.scale = scale
        this.width = this.customWidth / this.frames.xmax
        this.height = this.customHeight / this.frames.ymax
        this.stop = stop
    }

    draw() {
        c.drawImage(
            this.image,
            this.frames.xval * this.width,
            this.frames.yval * this.height,
            this.customWidth / this.frames.xmax,
            this.customHeight / this.frames.ymax, 
            this.position.x,
            this.position.y,
            (this.customWidth / this.frames.xmax) * this.scale,
            (this.customHeight / this.frames.ymax) * this.scale
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
