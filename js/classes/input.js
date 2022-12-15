class Input {

    constructor() {
        this.lastKey = 'heyhey'
        this.keys = {
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
            }
        }
    }
    
    keydown(e) {
        if (this.keys[e.key]) {
            this.keys[e.key].pressed = true
            this.lastKey = e.key
        }
    }

    keyup(e) {
        if (this.keys[e.key]) {
            this.keys[e.key].pressed = false
        }
    }

    getPressed(keys) {
        var result
        keys.forEach((e) => {
            if (this.keys[e].pressed && e === this.lastKey) {
                result = true
            }
        })
        return result
    }

    toggleOff(key) {
        this.keys[key].pressed = false
        this.lastKey = ''
    }

    addKey(key) {
        this.keys[key] = {
            pressed: false,
        }
    }
}

