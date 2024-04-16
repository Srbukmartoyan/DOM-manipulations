const lift = getElement('.lift');
const liftContainer = getElement('.lift-container');
const screen = getElement('.screen');
const floors = getElement('.floors');
const openDoor = getElement('.open');
const closeDoor = getElement('.close');
const rightDoor = getElement('.right');
const leftDoor = getElement('.left');
const countBtn = getElement('.count-btn');
const buildingHeight = 95;
const liftHeight = 80;
let heights;
const sec = 2;
let countOfFloors;
let isClosed = true;
let inprocess = false;
let prevFloor = 1;
let input;

function getElement(name, isAll) {
    if (isAll) {
        return document.querySelectorAll(name);
    }
    return document.querySelector(name);
}

function createElementWithClass(elementType, className) {
    const element = document.createElement(elementType);
    if (className) {
        element.classList.add(className);
    }
    return element;
}

function makeMove(floor, transition) {
        inprocess = true;
        liftContainer.style.marginBottom = `${(floor - 1) * heights}vh`;
        liftContainer.style.transition = `${transition}s`;
        setTimeout(() => {
            inprocess = false;
            console.log('stopped');
        }, (transition * 1000));
}

function onFloorClick(e) {
    if (isClosed && !inprocess) {
        const floor = Number(e.target.innerHTML);
        const transition = Math.abs(floor - prevFloor) * sec;
        prevFloor = floor;
        makeMove(floor, transition);
    }
}

function setScreenBtns() {
    for (let i = 0; i < countOfFloors; ++i) {
        const screenBtn = createElementWithClass('div', 'screen-btn');
        screenBtn.innerHTML = i + 1;
        screenBtn.addEventListener('click', (e) => onFloorClick(e));
        screen.appendChild(screenBtn);
    }
}
function setFloors() {
    for (let i = 0; i < countOfFloors; ++i) {
        const floor = createElementWithClass('div', 'floor');
        floor.innerHTML = i + 1;
        floor.style.height = `${heights}vh`;
        floors.appendChild(floor);
    }
}

function moveDoors(translateXValue) {
    rightDoor.style.transform = `translateX(-${translateXValue})`;
    leftDoor.style.transform = `translateX(${translateXValue})`;
}

function setHeights() {
    heights = buildingHeight / countOfFloors;
    liftContainer.style.height = `${heights}vh`
}

function initialize() {
    countOfFloors = "";
    floors.innerHTML = "";
    screen.innerHTML = "";
    input = getElement('input').value;
    if (input > 1 && input < 16) {
        countOfFloors = input;
    }
    setHeights();
    setScreenBtns();
    setFloors();
}

openDoor.addEventListener('click', () => {
    if (!inprocess) {
        isClosed = false;
        moveDoors('80%');
    }
});

closeDoor.addEventListener('click', () => {
    moveDoors('0');
    setTimeout(() => {
        isClosed = true;
    }, 2000)
});

countBtn.addEventListener('click', () => {
    initialize();
})

initialize();