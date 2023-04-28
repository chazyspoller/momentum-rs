import playListAudios from './playList.js';

const playList = document.querySelector('.play-list');

const createTrack = (title) => {
    const track = document.createElement('li');

    track.classList.add('play-item');
    track.textContent = title;

    return track;
};

const createPlayList = () => {
    playListAudios.forEach((audio) => {
        playList.append(createTrack(audio.title));
    });
};

createPlayList();
