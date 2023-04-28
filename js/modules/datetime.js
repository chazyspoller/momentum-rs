import {showGreeting} from "./greeting.js";
import getLanguage from "./languages.js";

const timeField = document.querySelector('.time');
const dateField = document.querySelector('.date');

// Определение языка системы
//const language = window.navigator.language;

const showDate = (lang, options = {weekday: 'long', month: 'long', day: 'numeric'}) => {
    const date = new Date();
    // Настройка вывода даты
    const currentDate = date.toLocaleDateString(lang, options);

    dateField.textContent = currentDate[0].toUpperCase() + currentDate.slice(1);
};

const showTime = (lang) => {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();

    timeField.textContent = currentTime;
    showDate(getLanguage(), (getLanguage() === 'ru-RU') ? {day: 'numeric', month: 'numeric', weekday: 'long'} : {weekday: 'long', month: 'long', day: 'numeric'});
    showGreeting(getLanguage());
    setTimeout(showTime.bind(null, getLanguage()), 1000);
};

showTime(getLanguage());

export {showDate};