// For the intro, death, and exit fades

function fadeIn() {
    gsap.to('#inner', {
        opacity: 0,
        repeat: 0,
        duration: 4,
    })
}

function fadeOut() {
    gsap.to('#inner', {
        opacity: 1,
        repeat: 0,
        duration: 1.5,
        onComplete() {
            //setArrayItem('unlocked', 'portfolio')
            sessionStorage.setItem('latest', 'portfolio')
            window.location.href = "/html/map.html"
        }
    })
}