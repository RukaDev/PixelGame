// Set the lever (bg + fg)

class Level {
    constructor(bg, fg, offset) {
        this.background = new Sprite({
            position: offset,
            image: bg,
            moveable: true
        })

        this.foreground = new Sprite({
            position: offset,
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