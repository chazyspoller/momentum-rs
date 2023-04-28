import {getWeather, setInitialCity} from './weather.js';
import {setQuotes, indexQuote} from './quotes.js';

const languages = document.querySelectorAll('.language-choice > input'),
    langRu = document.querySelector('#ru-RU'),
    langEn = document.querySelector('#en-EN');

let language = localStorage.getItem('languageRu') === 'true' ? 'ru-RU' : 'en-EN';

const setLocalStorage = () => {
    localStorage.setItem('languageRu', langRu.checked);
    localStorage.setItem('languageEn', langEn.checked);
};

window.addEventListener('beforeunload', setLocalStorage);

const getLocalStorage = () => {
    if (localStorage.getItem('languageRu') || localStorage.getItem('languageEn')) {
        langRu.setAttribute('checked', localStorage.getItem('languageRu'));
        langEn.setAttribute('checked', localStorage.getItem('languageEn'));
    } else {
        langRu.checked = 'false';
        langEn.checked = 'true';
        language = 'en-EN';
    }
};

window.addEventListener('load', getLocalStorage);

const changeLanguage = (evt) => {
    language = evt.target.id;
    setInitialCity(language);
    getWeather(language);
    setQuotes(indexQuote, language);
};

languages.forEach((lang) => lang.addEventListener('change', changeLanguage));

function getLanguage() {
    return language;
}

export default getLanguage;