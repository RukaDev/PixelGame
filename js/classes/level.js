// Set the lever (bg + fg)

class Level {
    constructor(bg, fg, offset) {
        this.background = new Sprite({
            position: {
                x: offset.x,
                y: offset.y
            },
            image: bg,
            moveable: true
        })

        this.foreground = new Sprite({
            position: {
                x: offset.x,
                y: offset.y
            },
            moveable: true,
            image: fg,
        })

        this.offset = offset
        Level.instance = this
    }

    changeBG() {

    }

    changeFG() {

    }
}