const burger = document.getElementById("burger")
const nav = document.getElementById("nav")

burger.addEventListener("click",()=>{

nav.classList.toggle("show")

})

function openModal(){

document.getElementById("modal").style.display="flex"

}

function closeModal(){

document.getElementById("modal").style.display="none"

}

window.addEventListener("scroll",()=>{

const header=document.getElementById("header")

if(window.scrollY>20){

header.style.boxShadow="0 8px 20px rgba(0,0,0,.08)"

}else{

header.style.boxShadow="none"

}

})

const reveals=document.querySelectorAll(".reveal")

function reveal(){

reveals.forEach(el=>{

const top=el.getBoundingClientRect().top
const height=window.innerHeight

if(top<height-100){

el.style.opacity=1
el.style.transform="translateY(0)"

}

})

}

window.addEventListener("scroll",reveal)
