// Base canvas

// Canvas properties
function setCanvas() {
    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')
    
    canvas.height = 1020
    canvas.width = 1980
     
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
}

