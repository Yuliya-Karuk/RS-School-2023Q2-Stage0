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
        this.controlTimer = document.querySelector('.timer__input');
        this.currentTimeElement = document.querySelector('.timer_time_current');
        this.durationTimeElement = document.querySelector('.timer_time_duration');

        this.songTitle = document.querySelector('.song__title');
        this.songSinger = document.querySelector('.song__singer');
        this.albumImage = document.querySelector('.audio-player__img');
        this.body = document.querySelector('body');

        this.audio;
        this.isPlayed = false;

        this.bindListeners();
    }

    bindListeners() {
        const context = this;

        document.addEventListener("DOMContentLoaded", () => context.createAudio());

        this.buttonPlay.addEventListener('click', () => context.playAudio());
        this.buttonPause.addEventListener('click', () => context.pauseAudio());

    }

    createAudio() {
        this.audio = new Audio();
    }

    playAudio() {
        this.audio.src = `src/audio/beyonce.mp3`;
        this.audio.currentTime = 0;
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
        this.buttonPlay.classList.toggle(AudioPlayerClasses.buttonHide);
        this.buttonPause.classList.toggle(AudioPlayerClasses.buttonHide);
    }


}