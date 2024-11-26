let imgs = [];

let images=JSON.parse(localStorage.getItem("records"));

images.forEach(img=>{
    imgs.push(img.name)
});

let crousal_slides = document.querySelector(".carousel-slides");



imgs.forEach((img) => {
    let slidediv = document.createElement("div");
    slidediv.classList.add("carousel-slide");
    slidediv.innerHTML = `
    <img src="img/${img}" alt="Slide 1">
    `;
    crousal_slides.appendChild(slidediv);
});


let slidecounter = document.querySelectorAll(".carousel-slide").length;


let slider = document.querySelector(".carousel-slides");

let cuurentslide = 0;

let interval;

//nextbtn
function nextslide() {
    cuurentslide = (cuurentslide + 1) % slidecounter;
    displayslider();
}

//nextbtn
function prevbtn() {
    cuurentslide = (cuurentslide - 1 + slidecounter) % slidecounter;
    displayslider();
}

//displayslider

function displayslider() {
    slider.style.transform = `translateX(-${cuurentslide * 100}%)`;
}

//startslider
function start() {
    interval = setInterval(nextslide, 3000);
}

//stopslider
function stop() {
    clearInterval(interval);
}

start();