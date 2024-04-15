const imgs = [
    "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
    "https://www.creativefabrica.com/wp-content/uploads/2023/01/05/Stunning-Paradise-Mountain-Landscape-Art-Graphics-56361478-1.jpg",
    "https://www.creativefabrica.com/wp-content/uploads/2023/01/05/Stunning-Paradise-Mountain-Landscape-Art-Graphics-56361389-1-1-580x387.jpg",
    "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
];
const slider = getElement('.slider');
const prev = getElement('.prev');
const next = getElement('.next');
const btns = getElement('.arrow', true);
let slides;
let slidesLength;
let direction;
let isPrevButtonClicked = false;
let isAutoSlideStart = true;
let isBtns = true;
let autoSlideTimer;

function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
        next.click();
    }, 2000);
}

function stopAutoSlide() {
    clearInterval(autoSlideTimer);
}

function createElementWithClass(elementType, className) {
    const element = document.createElement(elementType);
    if (className) {
        element.classList.add(className);
    }
    return element;
}

function setSlides() {
    const createSlide = src => {
        const slide = createElementWithClass('div', 'slide');
        const img = createElementWithClass('img', 'slide-img');
        img.src = src;
        slide.appendChild(img);
        slider.appendChild(slide);
    };

    imgs.forEach(createSlide);
    slides = getElement('.slide', true);
    slidesLength = slides.length;
}
setSlides();

function getElement(elem, all) {
    if (all) {
        return document.querySelectorAll(elem);
    }
    return document.querySelector(elem);
}

function moveSlidesInstantly(distance) {
    slider.style.transition = 'none';
    slider.style.transform = `translate(${distance})`;
}

function moveSlidesWithTransition(distance) {
    slider.style.transition = 'all 0.5s';
    slider.style.transform = `translate(${distance})`;
}

next.addEventListener('click', () => {
    if (isAutoSlideStart) {
        stopAutoSlide();
    }
    direction = -1;
    slider.style.transform = 'translate(-25%)';
})

prev.addEventListener('click', () => {
    if (isAutoSlideStart) {
        stopAutoSlide();
    }
    if (!isPrevButtonClicked) {
        direction = 1;
        slider.prepend(slider.lastElementChild);
        moveSlidesInstantly('-25%');
        setTimeout(() => {
            moveSlidesWithTransition('0');
        })
        if (isAutoSlideStart) {
            setTimeout(() => {
                startAutoSlide();
            }, 500);
        }
        isPrevButtonClicked = true;
        setTimeout(() => {
            isPrevButtonClicked = false;
        }, 500);
    }
})

slider.addEventListener('transitionend', () => {
    if (direction == -1) {
        slider.appendChild(slider.firstElementChild);
        moveSlidesInstantly('0');
        setTimeout(() => {
            slider.style.transition = 'all 0.5s';
        });
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
