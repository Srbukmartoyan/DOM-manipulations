const btn = getElement('button');
const fields = getElement('.fields');
const eaten = getElement('.eaten');
const timerDisplay = getElement('.timer');

let elephants = [];
let killedElephantsCount = 0;
let x = 0;
let y = 0;
let size;
let timerInterval;
let secondsPassed = 0;

function createElement(name) {
    return document.createElement(name);
}

function getElement(name, count) {
    if (count == 'all') {
        return document.querySelectorAll(name);
    }
    return document.querySelector(name);
}

function checkWinningCondition() {
    if (killedElephantsCount == size - 1) {
        clearInterval(timerInterval);
        setTimeout(() => {
            alert('Win! All elephants are eaten during ' + secondsPassed + ' seconds');
        }, 500);
    }
}

function checkEatingCondition(hero) {
    const heroRect = hero.getBoundingClientRect();
    for (let i = 0; i < elephants.length; i++) {
        const elephantRect = elephants[i].getBoundingClientRect();
        if (Math.abs(Math.floor(heroRect.top) - Math.floor(elephantRect.top)) <= 1 &&
            Math.abs(Math.floor(heroRect.left) - Math.floor(elephantRect.left)) <= 1) {
            killedElephantsCount++;
            elephants[i].remove();
            eaten.innerHTML = "Elephant eaten! Total: " + killedElephantsCount;
        }
    }
    checkWinningCondition();
}


function moveObject(event, hero) {
    const containerRect = fields.getBoundingClientRect();
    const heroRect = hero.getBoundingClientRect();
    switch (event.key) {
        case 'ArrowUp':
            if ((heroRect.top - 50) > containerRect.top) {
                y = y - 50 - 1;
            }
            break;
        case 'ArrowDown':
            if ((heroRect.bottom + 50) < containerRect.bottom) {
                y = y + 50 + 1;
            }
            break;
        case 'ArrowLeft':
            if ((heroRect.left - 50) > containerRect.left) {
                x = x - 50 - 1;
            }
            break;
        case 'ArrowRight':
            if ((heroRect.right + 50) < containerRect.right) {
                x = x + 50 + 1;
            }
            break;
    }
    hero.style.left = x + 'px';
    hero.style.top = y + 'px';
    checkEatingCondition(hero);
}

function createCharacter(place, characterClass) {
    let character;
    for (let i = 0; i < fields.children.length; ++i) {
        if (fields.children[i].id == place) {
            character = createElement('div');
            character.classList.add('character');
            character.classList.add(characterClass);
            fields.children[i].appendChild(character);
        }
    }
    return character;
}

function setHeroRandomly(size) {
    const heroRandomPlace = Math.floor(Math.random() * (size * size));
    createCharacter(heroRandomPlace, 'hero')
    return heroRandomPlace;
}

function setElephantsRandomly(size, heroRandomPlace) {
    let places = [heroRandomPlace];
    let count = 0;
    let max;
    if (size == 5) {
        max = 4;
    } else if (size == 7) {
        max = 6;
    } else {
        max = 9;
    }
    while (count < max) {
        let elephantPlace = Math.floor(Math.random() * (size * size));
        if (!places.includes(elephantPlace)) {
            places.push(elephantPlace);
            ++count;
            const elephant = createCharacter(elephantPlace, 'elephant');
            elephants.push(elephant);
        }
    }
}

function initializeGame() {
    size = getElement('select').value;
    eaten.innerHTML = "Count of eaten elephants: 0";
    timerDisplay.innerHTML = 'Timer: 0 seconds'
    fields.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    let count = 0;
    for (let i = 0; i < size * size; ++i) {
        const field = createElement('div');
        field.setAttribute('id', `${count}`);
        field.classList.add('field');
        fields.appendChild(field);
        ++count;
    }
    const heroRandomPlace = setHeroRandomly(size);
    setElephantsRandomly(size, heroRandomPlace);

    timerInterval = setInterval(function () {
        secondsPassed++;
        timerDisplay.innerHTML = 'Timer: ' + secondsPassed + ' seconds';
    }, 1000);
}

function endGame() {
    x = 0;
    y = 0;
    elephants.length = 0;
    killedElephantsCount = 0;
    secondsPassed = 0;
    clearInterval(timerInterval);
    fields.innerHTML = "";
}

btn.addEventListener('click', () => {
    endGame();
    initializeGame();
})

document.addEventListener('keydown', (event) => {
    const hero = getElement('.hero');
    if (hero) {
        moveObject(event, hero);
    }
})