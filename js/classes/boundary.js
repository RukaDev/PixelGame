class Boundary {
    // width and height are tile 16x16 times zoom multiplier (400% means 16*4)
    static width = 16 * 4.75
    static height = 16 * 4.75

    constructor({position}) {
        this.position = position
        this.width = Boundary.width
        this.height = Boundary.height
    }

    draw() {
        //c.fillStyle = 'red'
        //c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

// zone is a collection of boundaries, with helpers, but you can still get a single one easiily