// Drawing elements

function drawElements(elements) {
    elements.forEach((element) => {
        element.draw()
    })
}

function moveElements(elements, x, y) {
    elements.forEach((element) => {
        element.position.y += y
        element.position.x += x
    })
}