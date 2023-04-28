import getLanguage from "./languages.js";

const greeting = document.querySelector('.greeting-text');
const userNameField = document.querySelector('.greeting>input[type=text]');

const getTimeOfDay = (lang) => {
    const date = new Date();
    const hours = date.getHours();

    if (lang === 'en-EN') {
        switch (Math.floor(hours / 6)) {
            case 0: return 'Night';
            case 1: return 'Morning';
            case 2: return 'Afternoon';
            case 3: return 'Evening';
            default: return 'Night';
        }
    } else if (lang === 'ru-RU') {
        switch (Math.floor(hours / 6)) {
            case 0: return 'Ночи';
            case 1: return 'Утро';
            case 2: return 'День';
            case 3: return 'Вечер';
            default: return 'Ночи';
        }
    }
};

const getWordEnd = () => {
    switch (getTimeOfDay(getLanguage())) {
        case 'Ночи': return 'ой';
        case 'Утро': return 'ое';
        case 'День': return 'ый';
        case 'Вечер': return 'ый';
        default: return 'ой';
    }
};

const showGreeting = (lang) => {
    if (lang === 'en-EN') {
        greeting.textContent = `Good ${getTimeOfDay(lang)},`;
        if (localStorage.getItem('name')) {
            userNameField.value = localStorage.getItem('name');
        } else {
            userNameField.setAttribute('placeholder', '[Enter Name]');
        }
    } else if (lang == 'ru-RU') {
        greeting.textContent = `Добр${getWordEnd()} ${getTimeOfDay(lang)},`;
        if (localStorage.getItem('name')) {
            userNameField.value = localStorage.getItem('name');
        } else {
            userNameField.setAttribute('placeholder', '[Введите имя]');
        }
    }
};

const setLocalStorage = () => {
    localStorage.setItem('name', userNameField.value);
};

window.addEventListener('beforeunload', setLocalStorage);

const getLocalStorage = () => {
    if (localStorage.getItem('name')) {
        userNameField.value = localStorage.getItem('name');
    }
};

window.addEventListener('load', getLocalStorage);

export {showGreeting, getTimeOfDay};