// Drawing and moving elements

var canvas = {
    drawElements: function() {
        this.drawn.forEach((element) => {
            element.draw()
        })
    },

    moveElements: function(x, y) {
        this.moveable.forEach((element) => {
            element.position.y += y
            element.position.x += x
        })
    },

    manualMoveElement: function(element, x, y) {
        element.position.x += x
        element.position.y += y
    },

    removeElement: function(element) {
        removeFromArray(this.drawn, element)
        removeFromArray(this.moveable, element)
    },

    create: function(width, height) {
        this.instance = document.querySelector('canvas')
        this.instance.height = width
        this.instance.width = height

        this.ctx = this.instance.getContext('2d')
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(0, 0, width, height)

        this.height = height
        this.width = width
        this.center = {
            x: (width / 2),
            y: (height / 2)
        }
        
        this.moveable = []
        this.drawn = []
    }
}

