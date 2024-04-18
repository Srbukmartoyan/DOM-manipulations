const lift = getElement('.lift');
const liftContainer = getElement('.lift-container');
const screen = getElement('.screen');
const floors = getElement('.floors');
const openDoor = getElement('.open');
const closeDoor = getElement('.close');
const rightDoor = getElement('.right');
const leftDoor = getElement('.left');
const countBtn = getElement('.count-btn');
const manyBtn = getElement('.many');
const buildingHeight = 95;
const liftHeight = 80;
let heights;
const sec = 0.3;
let countOfFloors;
let isClosed = true;
let inprocess = false;
let prevFloor = 1;
let base = 0
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
    return new Promise((res, rej) => {
        inprocess = true;
        liftContainer.style.marginBottom = `${(floor - 1) * heights}vh`;
        liftContainer.style.transition = `${transition}s`;
        setTimeout(() => {
            inprocess = false;
            res();
        }, (transition * 1000));
    })
}

async function onFloorClick(e) {
    console.log(e.target.innerHTML);
    if (isClosed && !inprocess) {
        const floor = Number(e.target.innerHTML);
        const transition = Math.abs(floor - prevFloor) * sec;
        prevFloor = floor;
        await makeMove(floor, transition);
    } 
}

function setScreenBtns() {
    for (let i = 0; i < countOfFloors; ++i) {
        const screenBtn = createElementWithClass('button', 'screen-btn');
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
    liftContainer.style.height = `${heights}vh`;
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
    manyBtn.click();
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
    }, 2000);
});

countBtn.addEventListener('click', () => {
    initialize();
})

function cycleMove(floor, index, doorTransition, totalTransitionTime, arr) {
    setTimeout(async () => {
        await onFloorClick({ target: { innerHTML: floor } });
        inprocess = true;
        setTimeout(() => {
            moveDoors('80%'); 
            console.log('openes');
            setTimeout(() => {
                moveDoors('0'); 
                console.log('closes');
                setTimeout(() => {
                    inprocess = false;
                    if (index == arr.length - 1) {
                        manyBtn.disabled = false;
                        changeEventListeners(false);
                        manyBtn.click();
                    }
                }, 2000);
            }, 2000); 
        }, 1000); 
    }, totalTransitionTime + (doorTransition * index));
}

function cycleMoveSetup(arr) {
    console.log(arr);
    console.log(base);
    changeEventListeners(true);
    inprocess = false;
    let currentTransitionTime = 0;
    let totalTransitionTime = 0;
    arr.forEach((floor, index) => {
        const nextfloor = arr[index - 1] || 0;
        const prevFloor = arr[index - 2] || 0;
        const doorTransition = index == 0 ? 0 : 5000;
        const floorTransitionTime = Math.abs(nextfloor - prevFloor) * sec * 1000;
        currentTransitionTime += floorTransitionTime;
        totalTransitionTime += currentTransitionTime;
        cycleMove(floor, index, doorTransition, totalTransitionTime, arr);
    });
}

function changeEventListeners(isAttach) {
    const screenBtns = document.querySelectorAll('.screen-btn');
    screenBtns.forEach(btn => {
        btn.disabled = isAttach;
    });
    openDoor.disabled = isAttach;
    closeDoor.disabled = isAttach;
}

function sortBasedOnDistance(arr) {
    arr.sort((a, b) => Math.abs(a - base) - Math.abs(b - base));
    base = arr[arr.length - 1];
    return arr;
}

function startAgain() {
    console.log('do what you want');
    inprocess = false;
    setTimeout(() => {
        inprocess = true;
        console.log('start again');
        setTimeout(() => {
            startLifeCycle();
        }, 1000);
    }, 5000);
}

function continueCycle(arr) {
    if (!isClosed) {
        moveDoors('0');
        isClosed = true;
    }
    setTimeout(() => {
        arr = sortBasedOnDistance(arr);
        cycleMoveSetup(arr);
    }, 2100);
}

function startLifeCycle() {
    console.log('start cycling');
    let arr = [];
    manyBtn.disabled = true;
    inprocess = true;
    const screenBtns = document.querySelectorAll('.screen-btn');
    for (let i = 0; i < screenBtns.length; ++i) {
        screenBtns[i].addEventListener('click', () => {
            arr.push(Number(screenBtns[i].innerHTML));
        });
    }
    setTimeout(() => {
        if (arr.length == 0) {
           startAgain();
        } else {
            continueCycle(arr);
        }
    }, 5000);
}

manyBtn.addEventListener('click', () => {
    if (isClosed) {
        startLifeCycle();
    }
})


