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

    showSongList(songsList, id) {
        this.songsList.innerHTML = '';
        this.songsList.classList.add(AudioListClasses.songsActive);
        for (let i = 0; i < songsList.length; i += 1) {
            const songItem = document.createElement("li");
            songItem.classList.add(AudioListClasses.songItem);
            if (i === id) {
                songItem.classList.add(AudioListClasses.songItemActive);
            }
            songItem.innerHTML = `<h2 class="songs__title">${songsList[i].title}</h2>
                                  <h3 class="songs__singer">${songsList[i].singer}</h3>`;
            this.songsList.append(songItem);
        }
    }

    hideSongList() {
        this.songsList.classList.remove(AudioListClasses.songsActive);
    }

    showFavoritesList(songsList, id) {
        this.songsList.innerHTML = '';
        this.songsList.classList.add(AudioListClasses.songsActive);
        for (let i = 0; i < songsList.length; i += 1) {
            if (songsList[i].favorite === true) {
                const songItem = document.createElement("li");
                songItem.classList.add(AudioListClasses.songItem);
                if (i === id) {
                    songItem.classList.add(AudioListClasses.songItemActive);
                }
                songItem.innerHTML = `<h2 class="songs__title">${songsList[i].title}</h2>
                                    <h3 class="songs__singer">${songsList[i].singer}</h3>`;
                this.songsList.append(songItem);
            }
        }
    }
}

const newAudioList = new AudioList();