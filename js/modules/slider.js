import {getTimeOfDay} from './greeting.js';
import getLanguage from "./languages.js";

const getRandomNum = (min, max) => Math.round(Math.random() * (max - min) + min);

let randomImageIndex = getRandomNum(1, 20);

const setBg = (imageIndex) => {
    const timeOfDay = getTimeOfDay('en-EN').toLowerCase();
    let bgNum = imageIndex + '';

    bgNum = bgNum.length < 2 ? bgNum.padStart(2, '0') : bgNum;

    const img = new Image();
    img.src = `https://raw.githubusercontent.com/chazyspoller/momentum-images/assets/images/${timeOfDay}/${bgNum}.webp`;
    img.onload = () => {
        document.body.style.backgroundImage = `url("https://raw.githubusercontent.com/chazyspoller/momentum-images/assets/images/${timeOfDay}/${bgNum}.webp")`;
    };
};

setBg(randomImageIndex);

const btnNext = document.querySelector('.slide-next'),
    btnPrev = document.querySelector('.slide-prev');

const getSlideNext = () => {
    if (randomImageIndex === 20) {
        randomImageIndex = 1;
    } else {
        randomImageIndex++;
    }

    setBg(randomImageIndex);
};

const getSlidePrev = () => {
    if (randomImageIndex === 1) {
        randomImageIndex = 20;
    } else {
        randomImageIndex--;
    }

    setBg(randomImageIndex);
};

btnNext.addEventListener('click', getSlideNext);
btnPrev.addEventListener('click', getSlidePrev);
