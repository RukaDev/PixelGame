class Input {
    constructor() {
        this.lastKey = 'w'
        this.keys = {}

        window.addEventListener('keyup', e => {
            this.keys[e.key].pressed = false
        })

        window.addEventListener('keydown', e => {
            if (!this.keys[e.key]) {
                this.keys[e.key] = {}
            }
            this.lastKey = e.key
            this.keys[e.key].pressed = true
        })

        Input.instance = this
    }

    static getInstance() {
        return Input.instance
    }

    isPressed(keys) {
        return keys.some(key => {
            return this.keys[key] && this.keys[key].pressed && this.lastKey == key
        })
    }
}

