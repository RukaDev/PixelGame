class Controller {
    static speed = 3

    constructor() {
        this.lastKey = ''
    }
    
    keydown(e) {
        switch (e.key) {
            case 'w':
                keys.w.pressed = true
                lastKey = 'w'
                break
            case 'a':
                keys.a.pressed = true
                lastKey = 'a'
                break
            case 's':
                keys.s.pressed = true
                lastKey = 's'
                break
            case 'd':
                keys.d.pressed = true
                lastKey = 'd'
                break
        }
    }

    keyup(e) {
        switch (e.key) {
            case 'w':
                keys.w.pressed = false
                break
            case 'a':
                keys.a.pressed = false
                break
            case 's':
                keys.s.pressed = false
                break
            case 'd':
                keys.d.pressed = false
                break
        }
    }
}


// Key binds
const keys = {
    w: {
        pressed: false,
        positions: {
            y: 1
        }
    },
    a: {
        pressed: false,
        positions: {
            x: 1
        }
    },
    s: {
        pressed: false,
        positions: {
            y: -1
        }
    },
    d: {
        pressed: false,
        positions: {
            x: -1
        },
        swordOffset: {
            
        },
        keyOffset: {
            x: -10,
            y: 30
        }
    }
}


