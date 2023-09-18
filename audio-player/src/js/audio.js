import songsJSON from '../data/songs.json' assert { type: 'json' }
export { AudioPlayer };

const AudioPlayerClasses = {
    buttonHide: "control_hidden",
}

class AudioPlayer {
    constructor() {
        this.buttonPlay = document.querySelector('.controls__play_play');
        this.buttonPause = document.querySelector('.controls__play_pause');
        this.buttonVolume = document.querySelector('.controls__volume_volume');
        this.buttonMute = document.querySelector('.controls__volume_mute');
        this.buttonPrevious = document.querySelector('.controls__previous');
        this.buttonNext = document.querySelector('.controls__next');
        this.currentTimeElement = document.querySelector('.timer_time_current');
        this.durationTimeElement = document.querySelector('.timer_time_duration');
        this.controlTimer = document.querySelector('.timer__input');

        this.songTitle = document.querySelector('.song__title');
        this.songSinger = document.querySelector('.song__singer');
        this.albumImage = document.querySelector('.audio-player__img');
        this.body = document.querySelector('body');

        this.audio;
        this.isPlayed = false;
        this.singId = 1;
        this.song;

        this.bindListeners();
    }

    bindListeners() {
        const context = this;

        document.addEventListener("DOMContentLoaded", () => context.createAudio());
        this.buttonPlay.addEventListener('click', () => context.playAudio());
        this.buttonPause.addEventListener('click', () => context.pauseAudio());
        this.buttonPrevious.addEventListener('click', () => context.changeAudio(-1));
        this.buttonNext.addEventListener('click', () => context.changeAudio(1));

    }

    createAudio() {
        this.audio = new Audio();
        this.fillAudio();
        this.listenAudioTime();
    }

    fillAudio() {
        this.findSong(this.singId);
        this.audio.src = this.song.src;
        this.audio.currentTime = 0;
        this.songTitle.innerHTML = this.song.title;
        this.songSinger.innerHTML = this.song.singer;
        this.albumImage.src = this.song.img;
        this.body.style.backgroundImage = `url(${this.song.img})`;
        this.audio.onloadeddata = () => {
            this.showTime();
        }
    }

    findSong(id) {
        this.song = songsJSON[id];
    }

    playAudio() {
        this.audio.play();
        this.isPlayed = true;
        this.fillButtonPlay();
    }

    pauseAudio() {
        this.audio.pause();
        this.isPlayed = false;
        this.fillButtonPlay();
    }

    fillButtonPlay() {
        if (this.isPlayed) {
            this.buttonPlay.classList.add(AudioPlayerClasses.buttonHide);
            this.buttonPause.classList.remove(AudioPlayerClasses.buttonHide);
        }
        if (!this.isPlayed) {
            this.buttonPlay.classList.remove(AudioPlayerClasses.buttonHide);
            this.buttonPause.classList.add(AudioPlayerClasses.buttonHide);
        }
    }

    changeAudio(value) {
        this.singId = this.singId + value;
        if (this.singId === songsJSON.length ) {
            this.singId = 0;
        }
        if (this.singId === -1 ) {
            this.singId = 4;
        }
        this.fillAudio();
        this.playAudio();
    }

    listenAudioTime() {
        const context = this;
        this.audio.addEventListener('timeupdate', () => context.handleAudioTime());
        this.audio.addEventListener('ended', () => context.changeAudio(1));
        this.controlTimer.addEventListener('input', () => context.moveTimer());
    }

    handleAudioTime() {
        this.showTime();
        this.showTimer();
    }

    showTime() {
        const currentMinutes = Math.floor(this.audio.currentTime / 60);
        const currentSeconds = Math.floor(this.audio.currentTime - currentMinutes * 60);
        const durationMinutes = Math.floor(this.audio.duration / 60);
        const durationSeconds = Math.floor(this.audio.duration - durationMinutes * 60);

        this.currentTimeElement.innerHTML = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
        this.durationTimeElement.innerHTML = `${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
    }

    showTimer() {
        let percent = Math.floor((this.audio.currentTime / this.audio.duration) * 100);
        this.controlTimer.style.background = `linear-gradient(to right, #B01C25 0%, #B01C25 ${percent}%, #999999 ${percent}%, #999999 100%)`;
        this.controlTimer.value = percent;
    }

    moveTimer() {
        const progress = this.controlTimer.value * this.audio.duration / 100;
        this.audio.currentTime = progress;
    }
}