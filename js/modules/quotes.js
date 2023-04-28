import getLanguage from "./languages.js";

const quote = document.querySelector('.quote-text'),
    author = document.querySelector('.author'),
    changeQuoteBtn = document.querySelector('.change-quote');

const getRandomNum = (min, max) => Math.round(Math.random() * (max - min) + min);

async function getQuotes() {
    const quotes = './js/modules/data.json';
    const res = await fetch(quotes);
    const data = await res.json();

    return data;
}

async function setQuotes(index, lang) {
    const data = await getQuotes();

    if (lang === 'en-EN') {
        quote.textContent = data[index].text;
        author.textContent = data[index].author;
    } else {
        quote.textContent = data[index].textTranslateRu;
        author.textContent = data[index].authorTranslateRu;
    }
}

const quotesCount = (await getQuotes()).length - 1;
let indexQuote = getRandomNum(0, quotesCount);
setQuotes(indexQuote, localStorage.getItem('languageRu') === 'true' ? 'ru-RU' : 'en-EN');

const changeQuote = () => {
    if (indexQuote === quotesCount) {
        indexQuote = 0;
    } else {
        indexQuote++;
    }
    setQuotes(indexQuote, getLanguage());
};

changeQuoteBtn.addEventListener('click', changeQuote);

export {setQuotes, indexQuote};