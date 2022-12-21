/* ============================== typing animation ============================ */
var typed = new Typed(".typing",{
    strings:["","Hobbyist Game Developer", "Student", "Programmer"],
    typeSpeed:100,
    BackSpeed:60,
    loop:true
})



/* ============================== Aside ============================ */
const nav = document.querySelector(".nav"),
navList = nav.querySelectorAll("li"),
totalNavList = navList.length,
allSection = document.querySelectorAll(".section"),
totalSection = allSection.length;
const navTogglerBtn = document.querySelector(".nav-toggler"),
aside = document.querySelector(".aside");
var currentNav = navList[1]


for(let i=0; i<totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function() {
        for(let j=0; j<totalNavList; j++) {
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active")
        if(window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    })
}

function updateNav(sectId) {
    for(let i=0; i < totalNavList; i++) {
        var element = navList[i]
        var a = element.querySelector("a")
        var navId = a.getAttribute("href").split("#")[1]
        a.classList.remove("active");
        if(navId === sectId) {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}

navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
})

function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for(let i=0; i<totalSection; i++ ) {
        allSection[i].classList.toggle("open");
    }
}


function sectionScroll() {
    var pos = window.pageYOffset || document.docuemntElement.scrollTop
    var finalId

    for(let i=0; i<totalSection; i++ ) {
        var sect = allSection[i]
        var offset = Math.round(sect.getBoundingClientRect().top + pos)

        if (offset <= pos) {
            finalId = sect.id
        }
    }

    if (finalId) {
        updateNav(finalId.toLowerCase())
    }
}


/* ========================== toggle style switcher =========================== */
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
})
// hide style - switcher on scroll
window.addEventListener("scroll", () => {
    if(document.querySelector(".style-switcher").classList.contains("open"))
    {
        document.querySelector(".style-switcher").classList.remove("open");
    }
})

/* ========================== theme colors =========================== */
function setActiveStyle(color)
{
    document.documentElement.style.setProperty('--skin-color', 'var(--dark-peach)')
}


/* ========================== theme light and dark mode =========================== */
const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click", () => {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("dark");
})


const colors = document.querySelectorAll(".colors span")
colors.forEach((color) => {
    color.addEventListener('click', function() {
        setActiveStyle(color.className)
    })
})

window.addEventListener("load", () => {
    if(document.body.classList.contains("dark"))
    {
        dayNight.querySelector("i").classList.add("fa-sun");
    }
    else
    {
        dayNight.querySelector("i").classList.add("fa-moon");
    }
})

setActiveStyle('color-3')
document.body.classList.toggle("dark");

window.addEventListener('scroll', sectionScroll)

