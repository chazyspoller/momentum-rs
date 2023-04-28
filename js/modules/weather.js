import getLanguage from "./languages.js";

const weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.querySelector('.temperature'),
    weatherDescription = document.querySelector('.weather-description'),
    windSpeed = document.querySelector('.wind'),
    humidity = document.querySelector('.humidity'),
    weatherCityField = document.querySelector('.city');

const setLocalStorage = () => {
    localStorage.setItem('weather-city', weatherCityField.value);
};

window.addEventListener('beforeunload', setLocalStorage);

const getLocalStorage = () => {
    if (localStorage.getItem('weather-city')) {
        weatherCityField.value = localStorage.getItem('weather-city');
    }
};

window.addEventListener('load', getLocalStorage);

const setInitialCity = (lang) => {
    if (localStorage.getItem('weather-city') === '') {
        weatherCityField.value = ((lang === 'en-EN') ? 'Minsk' : 'Минск');
    }
};

async function getWeather(lang) {
    try {
        setInitialCity(lang);
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCityField.value}&lang=${lang.slice(0, 2)}&appid=81a7267ca8ba730ca692351ca8ce8b65&units=metric`;
        const res = await fetch(url);
        const data = await res.json();

        document.querySelector('.weather-error').textContent = '';
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        windSpeed.textContent = lang === 'en-EN' ? `Wind Speed: ${Math.round(data.wind.speed)} m/s` : `Скорость ветра: ${Math.round(data.wind.speed)} м/с`;
        humidity.textContent = (lang === 'en-EN' ? 'Humidity: ' : 'Влажность: ') + Math.round(data.main.humidity) + '%';
    } catch {
        document.querySelector('.weather-error').textContent = 'Data is not defiend. Try again';
        weatherIcon.className = '';
        temperature.textContent = '';
        weatherDescription.textContent = '';
        windSpeed.textContent = '';
        humidity.textContent = '';
    }
}

window.addEventListener('load', getWeather.bind(null, localStorage.getItem('languageRu') === 'true' ? 'ru-RU' : 'en-EN'));
weatherCityField.addEventListener('change', getWeather.bind(null, localStorage.getItem('languageRu') === 'true' ? 'ru-RU' : 'en-EN'));

export {getWeather, setInitialCity};