const counterContainer = getElement('.counter-container');
const logoCount = getElement('.logo-count');
const refresh = getElement('.refresh-items');
const restore = getElement('.restore');
let rows;
let addButtons; 
let decreseButtons;
let numbers;
let removeButtons;
let countOfNonZeroRows = 0;

const rowNumber = 5;
const rowElements = 4;

function restoreItems() {
    counterContainer.innerHTML = "";
    countOfNonZeroRows = 0;
    initialize();
}

function refreshItems() {
    numbers.forEach(el => {
        el.innerHTML = 0;
    })
    countOfNonZeroRows = 0;
    setLogoCount();
}

function setLogoCount() {
    logoCount.innerHTML = countOfNonZeroRows;
}

function disableDecreaseButton(row, isDisabled) {
    const decresButton = row.querySelector('.count.decrese');
    decresButton.disabled = isDisabled;
}

function checkInvalidDecrese(countDivContent, countDiv, row) {
    if (countDivContent == 1) {
        --countOfNonZeroRows;
        setLogoCount();
    }
    if (countDivContent == 0) { // result of click will change content into -1 but current content is 0;
        disableDecreaseButton(row, true);
    } else {
        countDiv.innerHTML = Number(countDiv.innerHTML) - 1;
    }
}

function changeContent(e, action) {
    const row = e.target.closest('.row');
    const countDiv = row.querySelector('.count.number');
    if (action == 'add') {
        if (countDiv.innerHTML == '0') {
            ++countOfNonZeroRows;
            setLogoCount();
            disableDecreaseButton(row, false);
        }
        countDiv.innerHTML = Number(countDiv.innerHTML) + 1;
    } else {
        checkInvalidDecrese(countDiv.innerHTML, countDiv, row);
    }
}

function removeRow(e) {
    const row = e.target.closest('.row');
    counterContainer.removeChild(row);
    if (countOfNonZeroRows) {
        --countOfNonZeroRows;
    }
    setLogoCount();
    if (!counterContainer.children.length) {
        restore.disabled = false;
    };
}

function getElement(name, isAll) {
    if (isAll) {
        return document.querySelectorAll(name);
    }
    return document.querySelector(name);
}

function createElementWithClass(elementType, ...className) {
    const element = document.createElement(elementType);
    if (className) {
        element.classList.add(...className);
    }
    return element;
}

function createIcon(className) {
    const icon = document.createElement('i');
    icon.classList.add('fa', className);
    icon.setAttribute('aria-hidden', 'true');
    return icon;
}

function createButtons(iconClass, ...buttonCLass) {
    const button = createElementWithClass(...buttonCLass);
    const icon = createIcon(iconClass);
    button.appendChild(icon);
    return button;
}

function setRows(rowNumber) {
    for (let i = 0; i < rowNumber; ++i) {
        const row = createElementWithClass('div', 'row');
        row.setAttribute('id', `${i}`);

        const number = createElementWithClass('div', 'count', 'number');
        number.innerHTML = 0;
        row.appendChild(number);

        const add = createButtons('fa-plus-circle', 'button', 'count', 'add');
        row.appendChild(add);

        const decrease = createButtons('fa-minus-circle', 'button', 'count', 'decrese');
        row.appendChild(decrease);

        const remove = createButtons('fa-trash', 'button', 'count', 'remove');
        row.appendChild(remove);

        counterContainer.appendChild(row);
    }
}

function setEventListeners() {
    addButtons.forEach( button => {
        button.addEventListener('click', (e) => changeContent(e, 'add'));
    });
    decreseButtons.forEach( button => {
        button.addEventListener('click', (e) => changeContent(e, 'decrese'));
    });
    removeButtons.forEach( button => {
        button.addEventListener('click', (e) => removeRow(e));
    })
    refresh.addEventListener('click', refreshItems);
    restore.addEventListener('click', restoreItems);
}

function initialize() {
    setRows(rowNumber);
    setLogoCount();
    rows = getElement('.row', true);
    numbers = getElement('.number', true);
    addButtons = getElement('.add', true);
    decreseButtons = getElement('.decrese', true);
    removeButtons = getElement('.remove', true);
    restore.disabled = true;

    setEventListeners();
}; 

initialize();