const input = document.querySelector('.task-input');
const add = document.querySelector('.btn');
const todos = document.querySelector('.todos');


const createElement = () => {
    const todo = document.createElement('div');
    todo.classList.add('todo-item');

    const trash = document.createElement('div');
    trash.classList.add('trash');
    trash.innerHTML = "🗑";

    const checkbox = document.createElement('input');
    checkbox.classList.add('check-btn');
    checkbox.setAttribute("type", "checkbox");

    const p = document.createElement('p');
    p.innerHTML = input.value;
   

    todo.appendChild(checkbox); 
    todo.appendChild(p); 
    todo.appendChild(trash);   
    todos.append(todo);
    input.value = "";

    checkbox.addEventListener('change', () => {
        p.classList.toggle('checked');
    })

    trash.addEventListener('click', () => {
        todos.removeChild(todo);
    })
};

add.addEventListener('click', () => {
    if (input.value !== "") {
        createElement();
    }
})

