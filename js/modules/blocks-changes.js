const blocksCheckers = document.querySelectorAll('.settings-blocks>input'),
    todo = document.querySelector('#todo'),
    quotes = document.querySelector('#quotes'),
    greeting = document.querySelector('#greeting'),
    date = document.querySelector('#date'),
    time = document.querySelector('#time'),
    weather = document.querySelector('#weather'),
    player = document.querySelector('#player');

const setLocalStorage = () => {
    localStorage.setItem('player', player.checked);
    localStorage.setItem('weather', weather.checked);
    localStorage.setItem('time', time.checked);
    localStorage.setItem('date', date.checked);
    localStorage.setItem('greeting', greeting.checked);
    localStorage.setItem('quotes', quotes.checked);
    localStorage.setItem('todo', todo.checked);
};

window.addEventListener('beforeunload', setLocalStorage);

const getLocalStorage = () => {
    if (localStorage.getItem('player') === 'true') {
        document.querySelector(`.player`).classList.remove('hidden');
    } else {
        document.querySelector(`.player`).classList.add('hidden');
    }
    if (localStorage.getItem('weather') === 'true') {
        document.querySelector(`.weather`).classList.remove('hidden');
    } else {
        document.querySelector(`.weather`).classList.add('hidden');
    }
    if (localStorage.getItem('time') === 'true') {
        document.querySelector(`.time`).classList.remove('hidden');
    } else {
        document.querySelector(`.time`).classList.add('hidden');
    }
    if (localStorage.getItem('date') === 'true') {
        document.querySelector(`.date`).classList.remove('hidden');
    } else {
        document.querySelector(`.date`).classList.add('hidden');
    }
    if (localStorage.getItem('greeting') === 'true') {
        document.querySelector(`.greeting`).classList.remove('hidden');
    } else {
        document.querySelector(`.greeting`).classList.add('hidden');
    }
    if (localStorage.getItem('quotes') === 'true') {
        document.querySelector(`.quotes`).classList.remove('hidden');
    } else {
        document.querySelector(`.quotes`).classList.add('hidden');
    }
    if (localStorage.getItem('todo') === 'true') {
        document.querySelector(`.todo`).classList.remove('hidden');
    } else {
        document.querySelector(`.todo`).classList.add('hidden');
    }
};

window.addEventListener('load', getLocalStorage);

const changeBlocksStatus = (evt) => {
    const block = document.querySelector(`.${evt.target.id}`);
    if (evt.target.checked) {
        block.classList.remove('hidden');
    } else {
        block.classList.add('hidden');
    }
};

blocksCheckers.forEach(checker => checker.addEventListener('change', changeBlocksStatus));