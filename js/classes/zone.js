class Zone {
    constructor(zoneData, isSprite) {
        this.zone = []
        if (isSprite) {
            this.zone = zoneData
        } else {
            this.create(zoneData)
        }
    }

    create(zoneData) {
        // 70 is tile height or width can't recall
        var map = []
        for (let i = 0; i < zoneData.length; i += 70) {
            map.push(zoneData.slice(i, 70 + i))
        }

        map.forEach((row, i) => {
            row.forEach((symbol, j) => {
            // 1025 collision id
            if (symbol === 1025)
                this.zone.push(new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                }))
            })
        })
    }

    destroy() {
        delete this
    }

    draw() {
        this.zone.forEach((boundary) => {
            boundary.draw()
        })
    }

    collision(x = 0, y = 0) {
        for (let i = 0; i < this.zone.length; i++) {
            var rectangle1 = player
            var rectangle2 = {
                ...this.zone[i],
                position: {
                    x: this.zone[i].position.x + x,
                    y: this.zone[i].position.y + y
                }
            }
            if (
                rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
                rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
                rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
                rectangle1.position.y + rectangle1.height >= rectangle2.position.y
            ) {            
                return this.zone[i]
            }
        }
    }

    proximity() {
        var p1 = player.position
        for (let i = 0; i < this.zone.length; i++) {
            var p2 = this.zone[i].position 
            var distance = Math.sqrt((Math.pow(p1.x-p2.x,2))+(Math.pow(p1.y-p2.y,2)))
            if (distance < 100) {
                return true
            }
        }
    }
}
