import songsJSON from '../data/songs.json' assert { type: 'json' };
import { newAudioList } from './audio_list.js';
export { AudioPlayer };

const AudioPlayerClasses = {
    buttonHide: "control_hidden",
}

class AudioPlayer {
    constructor() {
        this.buttonHeartUsual = document.querySelector('.controls__heart_usual');
        this.buttonHeartSelected = document.querySelector('.controls__heart_selected');
        this.buttonPlay = document.querySelector('.controls__play_play');
        this.buttonPause = document.querySelector('.controls__play_pause');
        this.buttonVolume = document.querySelector('.controls__volume_volume');
        this.buttonMute = document.querySelector('.controls__volume_mute');
        this.buttonPrevious = document.querySelector('.controls__previous');
        this.buttonNext = document.querySelector('.controls__next');
        this.currentTimeElement = document.querySelector('.timer_time_current');
        this.durationTimeElement = document.querySelector('.timer_time_duration');
        this.controlTimer = document.querySelector('.timer__input');

        this.buttonShelf = document.querySelector('.home__icon_shelf');
        this.buttonHome = document.querySelector('.home__icon_home');
        this.buttonFavorites = document.querySelector('.home__icon_favorites');
        this.timerBlock = document.querySelector('.timer');

        this.songTitle = document.querySelector('.song__title');
        this.songSinger = document.querySelector('.song__singer');
        this.albumImage = document.querySelector('.audio-player__img');
        this.body = document.querySelector('body');

        this.audio;
        this.isPlayed = false;
        this.singId = 0;
        this.song;
        this.isListShown = false;
        this.isFavoritesShown = false;
        this.isPlayedBeforeGrab = false;

        this.bindListeners();
    }

    bindListeners() {
        const context = this;

        window.addEventListener('load', () => context.createAudio());
        this.buttonPlay.addEventListener('click', () => context.playAudio());
        this.buttonPause.addEventListener('click', () => context.pauseAudio());
        this.buttonPrevious.addEventListener('click', () => context.changeAudioTrack(-1));
        this.buttonNext.addEventListener('click', () => context.changeAudioTrack(1));
        this.buttonHeartUsual.addEventListener('click', () => context.addToFavorites(this.singId));
        this.buttonShelf.addEventListener('click', () => context.showSongList());
        this.buttonHome.addEventListener('click', () => context.hideSongList());
        this.buttonFavorites.addEventListener('click', () => context.showFavoritesList());
        this.buttonVolume.addEventListener('click', () => context.toggleAudioVolume());
        this.buttonMute.addEventListener('click', () => context.toggleAudioVolume());
    }

    createAudio() {
        this.audio = new Audio();
        this.fillAudioInfo();
        this.listenAudioTime();
    }

    findActiveSong(id) {
        this.song = songsJSON[id];
    }

    fillAudioInfo() {
        this.findActiveSong(this.singId);
        this.audio.currentTime = 0;
        this.controlTimer.value = 0;
        this.audio.src = this.song.src;
        this.songTitle.innerHTML = this.song.title;
        this.songSinger.innerHTML = this.song.singer;
        this.albumImage.src = this.song.img;
        this.body.style.backgroundImage = `url(${this.song.img})`;
        this.audio.addEventListener('loadeddata', () => {
            this.showAudioTime();
        });
        this.fillButtonFavorites();
    }

    playAudio() {
        this.audio.play();
        this.isPlayed = true;
        this.toggleButtonPlay();
    }

    pauseAudio() {
        this.audio.pause();
        this.isPlayed = false;
        this.toggleButtonPlay();
    }

    toggleButtonPlay() {
        if (this.isPlayed) {
            this.buttonPlay.classList.add(AudioPlayerClasses.buttonHide);
            this.buttonPause.classList.remove(AudioPlayerClasses.buttonHide);
        }
        if (!this.isPlayed) {
            this.buttonPlay.classList.remove(AudioPlayerClasses.buttonHide);
            this.buttonPause.classList.add(AudioPlayerClasses.buttonHide);
        }
    }

    changeAudioTrack(value) {
        this.singId = this.singId + value;
        if (this.singId === songsJSON.length ) {
            this.singId = 0;
        }
        if (this.singId === -1 ) {
            this.singId = 4;
        }
        this.fillAudioInfo();
        this.playAudio();
        if (this.isListShown === true) {
            this.showSongList()
        }
        if (this.isFavoritesShown === true) {
            this.showFavoritesList();
        }
    }

    listenAudioTime() {
        const context = this;
        this.audio.addEventListener('timeupdate', () => context.handleAudioTime());
        this.audio.addEventListener('ended', () => context.changeAudioTrack(1));
        this.controlTimer.addEventListener('input', () => context.moveTimeControl(this.isPlayed));
    }

    handleAudioTime() {
        this.showAudioTime();
        this.showAudioTimeControl();
    }

    showAudioTime() {
        const currentMinutes = Math.floor(this.audio.currentTime / 60);
        const currentSeconds = Math.floor(this.audio.currentTime - currentMinutes * 60);
        const durationMinutes = Math.floor(this.audio.duration / 60);
        const durationSeconds = Math.floor(this.audio.duration - durationMinutes * 60);

        this.currentTimeElement.innerHTML = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
        this.durationTimeElement.innerHTML = `${this.song.duration}`;
    }

    showAudioTimeControl() {
        let percent = Math.floor((this.audio.currentTime / this.audio.duration) * 100);
        this.controlTimer.style.background = `linear-gradient(to right, #B01C25 0%, #B01C25 ${percent}%, #999999 ${percent}%, #999999 100%)`;
        this.controlTimer.value = percent;
    }

    moveTimeControl(isPlayed) {
        const context = this;
        this.isPlayedBeforeGrab = isPlayed;
        context.audio.pause();

        const progress = this.controlTimer.value * this.audio.duration / 100;
        this.audio.currentTime = progress;

        this.controlTimer.addEventListener('mouseup', (e) => {
            if (context.isPlayedBeforeGrab) context.playAudio();
        })
        this.controlTimer.addEventListener('touchend', (e) => {
            if (context.isPlayedBeforeGrab) context.playAudio();
        })
    }

    addToFavorites(id) {
        songsJSON[id].favorite = true;
        this.fillButtonFavorites();
        if (this.isFavoritesShown === true) {
            this.showFavoritesList();
        }
    }

    fillButtonFavorites() {
        if (this.song.favorite === true) {
            this.buttonHeartUsual.classList.add(AudioPlayerClasses.buttonHide);
            this.buttonHeartSelected.classList.remove(AudioPlayerClasses.buttonHide);
        } else {
            this.buttonHeartSelected.classList.add(AudioPlayerClasses.buttonHide);
            this.buttonHeartUsual.classList.remove(AudioPlayerClasses.buttonHide);
        }
    }

    showSongList() {
        this.albumImage.style.display = 'none';
        if (window.innerWidth < 501) {
            this.timerBlock.style.visibility = 'hidden';
        }
        newAudioList.showSongList(songsJSON, this.singId);
        this.isListShown = true;
    }

    hideSongList() {
        this.albumImage.style.display = 'block';
        this.timerBlock.style.visibility = 'visible';
        newAudioList.hideSongList();
        this.isListShown = false;
        this.isFavoritesShown = false;
    }

    showFavoritesList() {
        this.isListShown = false;
        this.albumImage.style.display = 'none';
        if (window.innerWidth < 501) {
            this.timerBlock.style.visibility = 'hidden';
        }
        newAudioList.showFavoritesList(songsJSON, this.singId);
        this.isFavoritesShown = true;
    }

    toggleAudioVolume() {
        if (!this.audio.muted) {
            this.buttonVolume.classList.add(AudioPlayerClasses.buttonHide);
            this.buttonMute.classList.remove(AudioPlayerClasses.buttonHide);
            this.audio.muted = true;
        } else {
            this.buttonVolume.classList.remove(AudioPlayerClasses.buttonHide);
            this.buttonMute.classList.add(AudioPlayerClasses.buttonHide);
            this.audio.muted = false;
        }
    }
}