const cardsContainer = getElement(".cards-container");
const input = getElement("input");
const startBtn = getElement(".start-btn");
const arr = [];
const frontUrl = 'https://media.istockphoto.com/id/614504084/vector/three-dimensional-grimacing-and-smiling-joker-with-playing-cards.jpg?s=612x612&w=0&k=20&c=uTVTQpWfZHVbEj7YufKlXy4ZPELb5rNG9IH0oUl1yns=';

let count = 0;
let cols = 0;

function getElement(name, quent) {
    if (quent == 'all') {
        return document.querySelectorAll(name);
    } else {
        return document.querySelector(name);
    }
}

const createElement = (name) => {
    return document.createElement(name);
}

const cardfn = (type, imgUrl) => {
    const className = type == "front" ? 'front-card' : 'back-card';
    const imgPath = imgUrl != undefined ? imgUrl : frontUrl;
    const img =  createElement('img');
    const card = createElement('div');
    card.classList.add(className);
    img.setAttribute('src', imgPath);
    img.classList.add('card-img');
    card.appendChild(img);
    return card;
}

const cardCreating = (url) => {
    const card = createElement('div');
    card.classList.add('card');

    const frontCard = cardfn('front');
    const backCard = cardfn('back', url);
    backCard.setAttribute('id', `${count++}`);

    card.appendChild(frontCard);
    card.appendChild(backCard);

    card.addEventListener('click', handler);
    return card;
};

function handler(e) {
    const card = e.currentTarget;
    if (arr.every(el => el.lastChild.getAttribute('id') !== card.lastChild.getAttribute('id'))) {
        card.classList.add('open');
        arr.push(card);
        if (arr.length % 2 == 0) {
           getElement('.card', 'all').forEach(card => {
                card.removeEventListener('click', handler);
            });
            setTimeout(() => {
                getElement('.card', 'all').forEach(card => {
                    card.addEventListener('click', handler);
                });
            }, 600);

            if (arr[arr.length - 1].lastChild.lastChild.src !== arr[arr.length - 2].lastChild.lastChild.src) {
                setTimeout(() => {
                    arr[arr.length - 1].classList.remove('open');
                    arr[arr.length - 2].classList.remove('open');
                    arr.splice(arr.length - 2, arr.length);
                }, 500);
            } else {
                if (arr.length == (cols * (cols - 1))) {
                    setTimeout(() => {
                        alert('happy end');
                        arr.length = 0;
                        count = 0;
                    }, 500);
                }
            }
        }
    }

}

const getRandomImages = (imgs, numsOfImages, repetition) => {
    let usedImgs = [];
    let count = 0;
    while (count < numsOfImages) { 
        reandomImg = imgs[Math.floor(Math.random() * imgs.length)];
        if (usedImgs.every(el => el != reandomImg)) {
            usedImgs.push(reandomImg);
            ++count;
        }
    }
    let res = [];
    for (let i = 0; i < repetition; ++i) { 
        res = res.concat(usedImgs);
    }
    return res;
}

const initializingGame = () => {
    const imgs = [
        'https://images.freeimages.com/images/large-previews/33c/object-with-path-1552086.jpg?fmt=webp&w=500',
        'https://images.pexels.com/photos/746496/pexels-photo-746496.jpeg?cs=srgb&dl=pexels-esther-746496.jpg&fm=jpg',
        'https://cdn.create.vista.com/api/media/small/616988130/stock-photo-bones-cranium-bones-head-skull-boundaries-facial-skeleton-nasal-cavity',
        'https://thumbs.dreamstime.com/b/zen-object-14004700.jpg',
        'https://zenfolio.com/wp-content/uploads/2022/10/still-life-guide-main.jpg'
    ];
    cols = Number(input.value);

    if (cols > 6 || cols < 2) {
        alert('value should be between 2 - 6');
        return;
    }

    cardsContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    const numsOfImages = cols % 2 == 0 ? cols - 1 : cols;
    repetition = cols % 2 == 0 ? cols : cols - 1;
    const usedImgs = getRandomImages(imgs, numsOfImages, repetition);

    for (let i = usedImgs.length - 1; i > 0; i--) {  
        const j = Math.floor(Math.random() * (i + 1));
        [usedImgs[i], usedImgs[j]] = [usedImgs[j], usedImgs[i]];
    }
   
    for (let i = 0; i < usedImgs.length; ++i) {
        const card = cardCreating(usedImgs[i]);
        cardsContainer.appendChild(card);
    }
    input.value = "";
};

finishingGame = () => {
    cardsContainer.innerHTML = "";
}

startBtn.addEventListener('click', () => {
    finishingGame();
    initializingGame();
})