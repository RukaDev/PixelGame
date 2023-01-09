// For the intro, death, and exit fades

var fade = {
    in: function(duration) {
        gsap.to('#inner', {
            opacity: 0,
            repeat: 0,
            duration: duration,
        })
    },
    
    out: function(duration, callback) {
        gsap.to('#inner', {
            opacity: 1,
            repeat: 0,
            duration: duration,
            onComplete() {
                callback()
            }
        })
    }
}

