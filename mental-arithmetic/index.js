const form = getElement('form');
const startAgain = getElement('.start-again');
const digitsContainer = getElement('.digits-container');
const start = getElement('.start');
const resultInput = getElement('.result');
const checkBtn = getElement('.check');

let speed;
let level;
let result;

function getElement(name, quent) {
    if (quent == 'all') {
        return document.querySelectorAll(name);
    }
    return document.querySelector(name);
}

const setTime = () => {
    if (speed == '0.5') {
        return 500;
    } else if (speed == '1') {
        return 1000;
    } else {
        return 1500;
    }
}

const changeVisibility = (visibility) => {
    if (visibility == 'hide') {
        resultInput.classList.add('passive');
        checkBtn.classList.add('passive');
        startAgain.classList.add('passive');
    } else {
        resultInput.classList.remove('passive');
        checkBtn.classList.remove('passive');
        startAgain.classList.remove('passive');
    }
}

const checkWinCondition = () => {
    checkBtn.addEventListener('click', function handler() {
        getElement('button', 'all').forEach(button => {
            button.removeEventListener('click', handler);
        });
        if (Number(resultInput.value) == result) {
            alert('win!');
            resultInput.value = "";
        } else {
            alert('fail!');
            resultInput.value = "";
        }
    })
}

const display = () => {

    const msc = setTime();
    const digits = getElement('p', 'all');

    let i = 0;
    const interval = setInterval(() => {
        if (i < 5) {
            digits[i - 1]?.classList.add('passive');
            digits[i].classList.remove('passive');
            ++i;
            start.addEventListener('click', () => {
                clearInterval(interval);
            });
            startAgain.addEventListener('click', () => {
                clearInterval(interval);
            })
        } else {
            digits[i - 1].classList.add('passive');
            clearInterval(interval);
            changeVisibility('show');
            checkWinCondition();
        }
    }, msc)
}


const generateRandomNumbers = (count, min, max, numbers) => {
    for (let i = 0; i < count; i++) {
        numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
}

const initializeGame = () => {
    let numbers = [];

    if (level === 'easy') {
        generateRandomNumbers(5, 0, 10, numbers);
    } else if (level === 'medium') {
        generateRandomNumbers(3, 0, 10, numbers);
        generateRandomNumbers(2, 10, 100, numbers);
    } else {
        generateRandomNumbers(5, 10, 100, numbers);
    } 
    
    result = numbers.reduce((accum, init) => accum + init);

    for (let i = 0; i < numbers.length; ++i) {
        const p = document.createElement('p');
        if (i % 2 == 0) {
            p.classList.add('red');
        } else {
            p.classList.add('blue');
        }
        p.classList.add('passive');
        p.innerHTML = numbers[i];
        digitsContainer.appendChild(p);
    } 
    display();
}

const finishGame = () => {
    digitsContainer.innerHTML = "";
}

const startGame = () => {
    finishGame();
    speed = getElement('#speed').value;
    level = getElement('#level').value; 
    changeVisibility('hide');
    initializeGame();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    startGame();
})

startAgain.addEventListener('click', () => {
    startGame();
})