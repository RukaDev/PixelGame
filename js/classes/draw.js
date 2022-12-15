class Draw {

    constructor() {

    }

    drawElements(elements) {
        elements.forEach((element) => {
            element.draw()
        })
    }

    moveElements(elements, x, y) {
        elements.forEach((element) => {
            element.position.y += y
            element.position.x += x
        })
    }
}