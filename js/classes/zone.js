class Zone {

    constructor(zoneData) {
        this.zone = []
        
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
                         x: j * Boundary.width + level.offset.x,
                         y: i * Boundary.height + level.offset.y
                     },
                     zone: this.zone
                 }))
             }) 
         })

        canvas.drawn.push(this)
        canvas.moveable.push(...this.zone)
    }

    removeBoundary(i) {
        this.zone.splice(i, 1)
    }

    mapPosition(elements, position, offset = {x: 0, y: 0}) {
        var map = new Map()
        this.proximitySort(position)
        for (var i = 0; i < elements.length; i++) {
            map.set(this.zone[i], elements[i])
            elements[i].sprite.position = {
                x: this.zone[i].position.x + offset.x,
                y: this.zone[i].position.y + offset.y
            }
        }
        return map
    }

    assignBoundaries(elements, position, offset = {x: 0, y: 0}) {
        this.proximitySort(position)
        for (var i = 0; i < elements.length; i++) {
            elements[i].boundary = this.zone[i]
            elements[i].sprite.position = {
                x: this.zone[i].position.x + (this.zone[i].width - elements[i].sprite.scaledWidth)/2,
                y: this.zone[i].position.y + (this.zone[i].height - elements[i].sprite.scaledHeight)/2
            }
        }
    }

    draw() {
        this.zone.forEach((boundary) => {
            //boundary.draw()
        })
    }

    // Sort the boundaries by position to player
    proximitySort(point) {
        this.zone.sort(function(a, b) {
            return distance(a.position, point) - distance(b.position, point)
        })
    }

    // Have to pass more specific info
    collision(sprite, x=0, y=0) {
        return this.zone.some(boundary => {
            return boundary.collision(sprite, x, y)
        })
    }
    
    proximity(amnt = 100, p1) {
        for (let i = 0; i < this.zone.length; i++) {
            var p2 = this.zone[i].position 
            var dist = distance(p1, p2)
            if (dist < amnt) {
                return this.zone[i]
            }
        }
    }
}
