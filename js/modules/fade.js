// For the intro, death, and exit fades

function fadeIn() {
    gsap.to('#inner', {
        opacity: 0,
        repeat: 0,
        duration: 4,
    })
}

function fadeOut(current) {
    gsap.to('#inner', {
        opacity: 1,
        repeat: 0,
        duration: 1.5,
        onComplete() {
            setArrayItem('unlocked', current)
            sessionStorage.setItem('fromGame', current)
            history.back()
        }
    })
}