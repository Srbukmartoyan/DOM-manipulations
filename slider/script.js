const imgs = [
    "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
    "https://www.creativefabrica.com/wp-content/uploads/2023/01/05/Stunning-Paradise-Mountain-Landscape-Art-Graphics-56361478-1.jpg",
    "https://www.creativefabrica.com/wp-content/uploads/2023/01/05/Stunning-Paradise-Mountain-Landscape-Art-Graphics-56361389-1-1-580x387.jpg",
    "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
];
const slider = getElement('.slider');
const prev = getElement('.prev');
const next = getElement('.next');
const btns = getElement('.arrow', true)
let slides;
let slidesLength;
let direction;
let isAutoSlideStart = true;
let isBtns = false;

let autoSlideTimer;

function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
        next.click(); 
    }, 2000);
}

function stopAutoSlide() {
    clearInterval(autoSlideTimer);
}

function setSlides() {
    imgs.forEach(src => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
    
        const img = document.createElement('img');
        img.classList.add('slide-img');
        img.src = src;

        slide.appendChild(img);
        slider.appendChild(slide);
    });
    slides = getElement('.slide', true);
    slidesLength = slides.length;
}
setSlides();


function getElement (elem, all) {
    if (all) {
        return document.querySelectorAll(elem);
    }
    return document.querySelector(elem);
}

next.addEventListener('click', () => {
    if (isAutoSlideStart) {
        stopAutoSlide();
    }
    direction = -1;
    slider.style.transform = 'translate(-25%)'; // 100 / 4 (number of images is 4) 
})

prev.addEventListener('click', () => {
    if (isAutoSlideStart) {
        stopAutoSlide();
    }
    direction = 1;
    slider.prepend(slider.lastElementChild);
    slider.style.transition = 'none';
    slider.style.transform = 'translate(-25%)'; 
    setTimeout(() => {
        slider.style.transition = 'all 0.5s';
        slider.style.transform = 'translate(0)';
    })
    if (isAutoSlideStart) {
        startAutoSlide();
    }
})

slider.addEventListener('transitionend', () => {
    if (direction == -1) {
        slider.appendChild(slider.firstElementChild);
        slider.style.transition = 'none'; // want to bring back to the first slide wifthout transition effect
        slider.style.transform = 'translate(0)';
        setTimeout(() => {
            slider.style.transition = 'all 0.5s';
        })
        if (isAutoSlideStart) {
            startAutoSlide();
        }
    } 
})

if (isAutoSlideStart) {
    startAutoSlide();
}

if (!isBtns) {
    btns.forEach(el => el.style.display = 'none');
}
