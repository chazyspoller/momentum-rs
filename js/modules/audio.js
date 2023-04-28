import playListAudios from './playList.js';
import './audioList.js';

let playNum = 0,
    isPlay = false,
    timeRange = 0,
    audioVolume = 1;

const playBtn = document.querySelector('.play'),
    playNextBtn = document.querySelector('.play-next'),
    playPrevBtn = document.querySelector('.play-prev'),
    audio = document.querySelector('audio'),
    playList = document.querySelector('.play-list').children,
    timeline = document.querySelector('.player-timeline'),
    volumeBtn = document.querySelector('.volume-btn'),
    volumeRange = document.querySelector('.volume-range'),
    progressBar = volumeRange.querySelector('.progress');

audio.src = playListAudios[0].src;
playList[0].classList.add('item-active');
progressBar.style.width = audioVolume * 100 + '%';
setAudioTitle(playListAudios[0].title);

function playAudio() {
    audio.src = playListAudios[playNum].src;

    if (!isPlay) {
        audio.currentTime = timeRange;
        playBtn.classList.add('pause');
        playList[playNum].classList.add('item-active');
        setAudioTitle(playListAudios[playNum].title);
        audio.play();
        isPlay = true;
    } else {
        audio.currentTime = timeRange;
        playBtn.classList.remove('pause');
        audio.pause();
        isPlay = false;
    }
}

const playPrevAudio = () => {
    playList[playNum].classList.remove('item-active');

    if (playNum === 0) {
        playNum = playListAudios.length - 1;
    } else {
        playNum--;
    }

    isPlay = false;
    timeRange = 0;
    playAudio();
};


const playNextAudio = () => {
    playList[playNum].classList.remove('item-active');

    if (playNum === playListAudios.length - 1) {
        playNum = 0;
    } else {
        playNum++;
    }

    isPlay = false;
    timeRange = 0;
    playAudio();
};

playBtn.addEventListener('click', playAudio);
playNextBtn.addEventListener('click', playNextAudio);
playPrevBtn.addEventListener('click', playPrevAudio);
audio.addEventListener('ended', playNextAudio);

// Timeline

timeline.addEventListener('click', (evt) => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = evt.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
});

setInterval(() => {
    const progressBar = timeline.querySelector('.progress');
    progressBar.style.width = audio.currentTime / audio.duration * 100 + '%';
    timeRange = audio.currentTime;
    document.querySelector(".time-duration").textContent = getTimeCodeFromNum(audio.currentTime) + ' / ' + playListAudios[playNum].duration.slice(1);
}, 500);

// Audio Time

function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
    ).padStart(2, 0)}`;
}

// Audio Title

function setAudioTitle(title) {
    const audioTitle = document.querySelector('.audio-title');
    audioTitle.textContent = title;
}

// Volume

const switchVolume = () => {
    if (volumeBtn.classList.contains('volume-btn-off')) {
        audio.volume = audioVolume;
    } else {
        audio.volume = 0;
    }
    volumeBtn.classList.toggle('volume-btn-off');
};

volumeBtn.addEventListener('click', switchVolume);

volumeRange.addEventListener('click', (evt) => {
    const volumeWidth = window.getComputedStyle(volumeRange).width;
    const volumeToSeek = evt.offsetX / parseInt(volumeWidth);
    const progressBar = volumeRange.querySelector('.progress');
    progressBar.style.width = volumeToSeek * 100 + '%';

    if (volumeToSeek === 0) {
        switchVolume();
    } else if (audio.volume === 0 && volumeToSeek !== 0) {
        volumeBtn.classList.remove('volume-btn-off');
    }

    audio.volume = volumeToSeek;
    audioVolume = volumeToSeek;
});

// Repeat

const repeatBtn = document.querySelector('.repeat-btn');

repeatBtn.addEventListener('click', () => {
    if (repeatBtn.classList.contains('repeat-btn-on')) {
        audio.loop = false;
    } else {
        audio.loop = true;
    }
    repeatBtn.classList.toggle('repeat-btn-on');
});