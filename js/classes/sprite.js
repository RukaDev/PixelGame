class Sprite {
    constructor({position, velocity = 10, image, frames = {xmax: 1, ymax: 1}, sprites, scale = 1}) {
        this.position = position
        this.image = image
        this.frames = {...frames, xval: 0, yval: 0, elapsed: 0}
        this.moving = false
        this.sprites = sprites
        this.velocity = velocity
        this.scale = scale
        this.width = image.width / this.frames.xmax
        this.height = image.height / this.frames.ymax
    }

    draw() {
        c.drawImage(
            this.image,
            this.frames.xval * this.width,
            this.frames.yval * this.height,
            this.image.width / this.frames.xmax,
            this.image.height / this.frames.ymax, 
            this.position.x,
            this.position.y,
            (this.image.width / this.frames.xmax) * this.scale,
            (this.image.height / this.frames.ymax) * this.scale
        )

        if (!this.moving) return  

        if (this.frames.xmax > 1) {
            this.frames.elapsed++
        }

        if (this.frames.elapsed % this.velocity === 0) {
            if (this.frames.xval < this.frames.xmax - 1) {
                this.frames.xval++
            } else {
                this.frames.xval = 0
            }
        }
    }
}
