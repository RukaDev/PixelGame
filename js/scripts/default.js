/* ============================== typing animation ============================ */
var typed = new Typed(".typing",{
    strings:["","Hobbyist Game Developer", "Student", "Developer"],
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
    a.onclick = function() {
        for(let j=0; j<totalNavList; j++) {
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active")
        if(window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
        var id = a.href.substring(a.href.indexOf('#'))
        var element = document.querySelector(id)
        element.scrollIntoView({behavior: 'smooth'}, true);
        return false
    }
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

        if (offset - 500 <= pos) {
            finalId = sect.id
        }
    }

    if (finalId) {
        updateNav(finalId.toLowerCase())
    }
}



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

window.addEventListener("load", () => {
    if(document.body.classList.contains("dark"))
    {
        dayNight.querySelector("i").classList.add("fa-sun");
    }
    else
    {
        dayNight.querySelector("i").classList.add("fa-moon");
    }

    window.addEventListener('scroll', sectionScroll)
})


setActiveStyle('color-3')
document.body.classList.toggle("dark");

var leaveIcon = document.querySelector('.back-out')
leaveIcon.addEventListener("click", () => {
    window.history.back()
})

