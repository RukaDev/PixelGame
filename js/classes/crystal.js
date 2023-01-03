// For placement, detection, etc of crystals

/* 

Two methods:

Spawn a bunch of crystals and collect them all
    Use zone.assignBoundaries(crystals) to give each crystal a boundary
or
Have one crystal that can change to a set of positions


*/

class Crystal {

    static crystals = []

    // Check if any of the crystals were collected
    static reached(crystals) {
        crystals.forEach(crystal => {
            if (crystal.boundary.collision(Player.instance.playerSprite)) {
                Canvas.instance.removeElement(crystal.sprite)
                Canvas.instance.removeElement(crystal.boundary)
                crystal.boundary.cleanup()
                crystal.cleanup(crystals)
            }
        })
    }

    constructor({image, positionZone, boundary}) {
        this.sprite = new Sprite({
            image: image,
            frames: {
                xmax: 3,
                ymax: 1
            },
            velocity: 40,
            scale: 2,
            moveable: true
        })

        this.boundary = boundary
        this.sprite.moving = true
        this.positionZone = positionZone
        this.positionIter = 0

        if (this.positionZone) {
            this.positionZone.proximitySort(Canvas.instance.center)
            this.sprite.position = {
                x: positionZone.zone[0].position.x,
                y: positionZone.zone[0].position.y
            } 
        } else if (boundary) {
            this.boundary = boundary
            this.sprite.position = {
                x: this.boundary.position.x,
                y: this.boundary.position.y
            }
        }

        Crystal.crystals.push(this)
    }

    // Delete crystal
    cleanup(crystals) {
        removeFromArray(crystals, this)
        deleteObject(this)
    }
 
    // Check if we are at the last position
    isLast() {
        return this.positionIter == this.positionZone.zone.length - 1
    }

    // Move crystal to the next location
    nextPosition() {
        this.positionIter++
        this.sprite.position = {
            x: this.positionZone.zone[this.positionIter].position.x,
            y: this.positionZone.zone[this.positionIter].position.y
        }
    }

    // Check if the player reached it
    reached(sprite) {
        return this.positionZone.zone[this.positionIter].collision(sprite)
    }

    singleReach(sprite) {
        return this.boundary.collision(sprite)
    }
}

