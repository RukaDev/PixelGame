class Zone {
    constructor(zoneData, isSprite) {
        this.zone = []
        if (isSprite) {
            this.zone = zoneData
        } else {
            this.create(zoneData)
        }
    }

    add(boundary) {
        
    }

    create(zoneData) {
        // 50 is the map width
        var map = []
        for (let i = 0; i < zoneData.length; i += 50) {
            map.push(zoneData.slice(i, 50 + i))
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

    // Sort the boundaries by position to player
    proximitySort(point) {
        this.zone.sort(function(a, b) {
            return distance(a.position, point) - distance(b.position, point)
        })
    }

    // Have to pass more specific info
    collision(x = 0, y = 0) {
        for (let i = 0; i < this.zone.length; i++) {
            var rectangle1 = {
                position: {
                    x: player.position.x,
                    y: player.position.y
                },

                width: player.width * player.scale,
                height: player.height * player.scale
            }
            var rectangle2 = {
                ...this.zone[i],
                position: {
                    x: this.zone[i].position.x + x,
                    y: this.zone[i].position.y + y
                }
            }
            
            if (collision(rectangle1, rectangle2)) {
                return true
            }
        }
    }

    singleCollision(x = 0, y = 0, i) {
        var rectangle1 = {
            position: {
                x: player.position.x,
                y: player.position.y
            },

            width: player.width * player.scale,
            height: player.height * player.scale
        }
        var rectangle2 = {
            ...this.zone[i],
            position: {
                x: this.zone[i].position.x + x,
                y: this.zone[i].position.y + y
            }
        }
        
        if (collision(rectangle1, rectangle2)) {
            return true
        }
    }

    

    proximity(amnt = 100) {
        var p1 = player.position
        for (let i = 0; i < this.zone.length; i++) {
            var p2 = this.zone[i].position 
            var dist = distance(p1, p2)
            if (dist < amnt) {
                return this.zone[i]
            }
        }
    }

    inside(x, y) {
        for (let i = 0; i < this.zone.length; i++) {
            var rectangle1 = {
                position: {
                    x: player.position.x + x,
                    y: player.position.y + y
                },
    
                width: player.width * player.scale,
                height: player.height * player.scale
            }
            var rectangle2 = {
                ...this.zone[i],
                position: {
                    x: this.zone[i].position.x + x,
                    y: this.zone[i].position.y + y
                }
            }
            
            if (bounded(rectangle1, rectangle2, player.scale)) {
                return true
            }
        }
    }

    insideSingle(x, y) {

    }
}
