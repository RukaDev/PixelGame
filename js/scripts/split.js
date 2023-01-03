const content = document.querySelector(".content");
const left = document.querySelector(".left");
const right = document.querySelector(".right");

var defaultBtn = document.querySelector("#defaultBtn")
var gameBtn = document.querySelector("#gameBtn")

left.addEventListener('mouseenter', () => {
  content.classList.add('hover-left');
})

left.addEventListener('mouseleave', () => {
  content.classList.remove('hover-left');
})

right.addEventListener('mouseenter', () => {
  content.classList.add('hover-right');
})

right.addEventListener('mouseleave', () => {
  content.classList.remove('hover-right');
})

gameBtn.addEventListener('click', function(){
  window.location.href = "/html/map.html"
})

defaultBtn.addEventListener('click', function() {
  window.location.href = "/html/default.html"
})