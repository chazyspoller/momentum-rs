const todo = document.querySelector('.todo'),
    todoText = todo.querySelector('.todo__text'),
    addTodo = todo.querySelector('.todo__add'),
    deleteTodo = todo.querySelector('.todo__delete'),
    todoList = todo.querySelector('.todo__items');

const setLocalStorage = () => {
    localStorage.setItem('todo-list', todoList.innerHTML);
};

window.addEventListener('beforeunload', setLocalStorage);

const getLocalStorage = () => {
    if (localStorage.getItem('todo-list')) {
        todoList.innerHTML = localStorage.getItem('todo-list');
        if (todoList.children.length > 3) {
            todo.classList.add('todo-big');
        } else {
            todo.classList.remove('todo-big');
        }
    }
};

window.addEventListener('load', getLocalStorage);

const createTodoTask = () => {
    const date = JSON.stringify({add: new Date().toLocaleString().slice(0, -3)});

    const element = `<li class="todo__item">
        <span class="todo__task">
          ${todoText.value}
          <span class="todo__date" data-todo-date="${date}">
            <span>${new Date().toLocaleString().slice(0, -3)}</span>
          </span>
        </span>
        <span class="todo__delete"></span>
        </li>`;

    todoText.value = '';

    return element;
};

const addTodoTask = (evt) => {
    if (todoText.value.trim() !== '') {
        todoList.innerHTML += createTodoTask();
    }

    if (todoList.children.length > 3) {
        todo.classList.add('todo-big');
    } else {
        todo.classList.remove('todo-big');
    }
};

const deleteTask = (evt) => {
    if (evt.target.classList.contains('todo__delete')) {
        todoList.removeChild(evt.target.closest('li'));
    }

    if (todoList.children.length <= 3) {
        todo.classList.remove('todo-big');
    }
};

const onEnterToDoList = (evt) => {
    if (evt.key === 'Enter') {
        addTodoTask();
    }
};

addTodo.addEventListener('click', addTodoTask);
todoList.addEventListener('click', deleteTask);
todoText.addEventListener('keypress', onEnterToDoList);
