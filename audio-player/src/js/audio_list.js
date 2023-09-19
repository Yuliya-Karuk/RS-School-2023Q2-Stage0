import { AudioPlayer } from './audio.js';
export { newAudioList };

const AudioListClasses = {
    songsActive: "songs_active",
    songItem: "songs__item",
    songItemActive: "songs__item_active",
    songTitle: "songs__title",
    singSinger: "songs__singer"
}

class AudioList {
    constructor() {
        this.songsList = document.querySelector('.songs');
        this.buttonHeartSelected = document.querySelector('.controls__heart_selected');
        this.buttonPlay = document.querySelector('.controls__play_play');
    }

    showSongList(songsJSON, id) {
        this.songsList.innerHTML = '';
        this.songsList.classList.add(AudioListClasses.songsActive);
        for (let i = 0; i < songsJSON.length; i += 1) {
            const songItem = document.createElement("li");
            songItem.classList.add(AudioListClasses.songItem);
            if (i === id) {
                songItem.classList.add(AudioListClasses.songItemActive);
            }
            songItem.innerHTML = `<h2 class="songs__title">${songsJSON[i].title}</h2>
                                  <h3 class="songs__singer">${songsJSON[i].singer}</h3>`;
            this.songsList.append(songItem);
        }
    }

    hideSongList() {
        this.songsList.classList.remove(AudioListClasses.songsActive);
    }

    showFavoritesList(songsJSON, id) {
        this.songsList.innerHTML = '';
        this.songsList.classList.add(AudioListClasses.songsActive);
        for (let i = 0; i < songsJSON.length; i += 1) {
            if (songsJSON[i].favorite === true) {
                const songItem = document.createElement("li");
                songItem.classList.add(AudioListClasses.songItem);
                if (i === id) {
                    songItem.classList.add(AudioListClasses.songItemActive);
                }
                songItem.innerHTML = `<h2 class="songs__title">${songsJSON[i].title}</h2>
                                    <h3 class="songs__singer">${songsJSON[i].singer}</h3>`;
                this.songsList.append(songItem);
            }
        }
    }
}

const newAudioList = new AudioList();