function distance(p1, p2) {
    const x = p2.x - p1.x
    const y = p2.y - p1.y
    return Math.sqrt((x*x) + (y*y));
}

function bounded(rectangle1, rectangle2, scale) {
    return (
        rectangle1.position.x >= rectangle2.position.x &&
        rectangle1.position.x + scale < rectangle2.position.x + rectangle2.width - rectangle1.width &&
        rectangle1.position.y >= rectangle2.position.y &&
        rectangle1.position.y + scale < rectangle2.position.y + rectangle2.height - rectangle1.height
    ) 
}

function collision(rectangle1, rectangle2) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}
