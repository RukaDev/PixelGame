/*

Canvas for drawing and moving elements on the screen



This is how i am fine with it being
Note, include methods to help make things easier like
the static ones, and ones like the lever callback option
that gives more of a purpose for usefull callbacks

*/

class Canvas {
    drawElements() {
        this.drawn.forEach((element) => {
            element.draw()
        })
    }

    moveElements(x, y) {
        this.moveable.forEach((element) => {
            element.position.y += y
            element.position.x += x
        })
    }

    manualMoveElement(element, x, y) {
        element.position.x += x
        element.position.y += y
    }

    removeElement(element) {
        removeFromArray(this.drawn, element)
        removeFromArray(this.moveable, element)
    }

    static getInstance() {
        return Canvas.instance
    }

    constructor() {
        this.canvas = document.querySelector('canvas')
        this.canvas.height = 1020
        this.canvas.width = 1980

        this.ctx = this.canvas.getContext('2d')
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        this.center = {
            x: (this.canvas.width / 2),
            y: (this.canvas.height / 2)
        }

        this.moveable = []
        this.drawn = []

        Canvas.instance = this
    }
}