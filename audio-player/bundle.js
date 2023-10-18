/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/assessment.js":
/*!******************************!*\
  !*** ./src/js/assessment.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   selfAssessment: () => (/* binding */ selfAssessment)
/* harmony export */ });

const selfAssessment = "Library#3 - (70/60)\n1. Вёрстка (10)\n - вёрстка аудиоплеера: есть кнопка Play/Pause, кнопки 'Вперёд' и 'Назад' для пролистывания аудиотреков, прогресс-бар, отображается название и автор трека +5\n - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5\n2. Кнопка Play/Pause (10)\n - есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека +5\n - внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек +5\n3. При кликах по кнопкам 'Вперёд' и 'Назад' переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый (10)\n4. При смене аудиотрека меняется изображение - обложка аудиотрека (10)\n5. Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека (10)6. Отображается продолжительность аудиотрека и его текущее время проигрывания (10)\n7.Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения (10)\n - возможность mute/unmute аудио, при этом меняется вид кнопки\n - возможность добавлять трек в любимые при нажатии на сердечко в контролах, при этом меняется вид сердечка\n - возможность посмотреть все треки в плейлисте при нажатии на кнопку 'Shelf' в меню Home; выделяется трек, который играет; выйти из списка можно нажав кнопку 'Home'\n - возможность посмотреть любимые треки в плейлисте при нажатии на кнопку 'Heart' в меню Home; если трек, который играет, есть в любимые он выделяется; выйти из списка можно нажав кнопку 'Home'";

/***/ }),

/***/ "./src/js/audio.js":
/*!*************************!*\
  !*** ./src/js/audio.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AudioPlayer: () => (/* binding */ AudioPlayer)
/* harmony export */ });
/* harmony import */ var _songs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./songs.js */ "./src/js/songs.js");
/* harmony import */ var _audio_list_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./audio_list.js */ "./src/js/audio_list.js");



const AudioPlayerClasses = {
  buttonHide: "control_hidden"
};
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
    this.song = _songs_js__WEBPACK_IMPORTED_MODULE_0__.songsList[id];
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
      this.handleAudioTime();
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
    if (this.singId === _songs_js__WEBPACK_IMPORTED_MODULE_0__.songsList.length) {
      this.singId = 0;
    }
    if (this.singId === -1) {
      this.singId = 4;
    }
    this.fillAudioInfo();
    this.playAudio();
    if (this.isListShown === true) {
      this.showSongList();
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
    this.currentTimeElement.innerHTML = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
    this.durationTimeElement.innerHTML = `${this.song.duration}`;
  }
  showAudioTimeControl() {
    let percent;
    if (this.audio.duration) {
      percent = Math.floor(this.audio.currentTime / this.audio.duration * 100);
    } else {
      percent = 0;
    }
    this.controlTimer.style.background = `linear-gradient(to right, #B01C25 0%, #B01C25 ${percent}%, #999999 ${percent}%, #999999 100%)`;
    this.controlTimer.value = percent;
  }
  moveTimeControl(isPlayed) {
    const context = this;
    this.isPlayedBeforeGrab = isPlayed;
    context.audio.pause();
    const progress = this.controlTimer.value * this.audio.duration / 100;
    this.audio.currentTime = progress;
    this.controlTimer.addEventListener('mouseup', e => {
      if (context.isPlayedBeforeGrab) context.playAudio();
    });
    this.controlTimer.addEventListener('touchend', e => {
      if (context.isPlayedBeforeGrab) context.playAudio();
    });
  }
  addToFavorites(id) {
    _songs_js__WEBPACK_IMPORTED_MODULE_0__.songsList[id].favorite = true;
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
    this.isFavoritesShown = false;
    this.albumImage.style.display = 'none';
    if (window.innerWidth < 501) {
      this.timerBlock.style.visibility = 'hidden';
    }
    _audio_list_js__WEBPACK_IMPORTED_MODULE_1__.newAudioList.showSongList(_songs_js__WEBPACK_IMPORTED_MODULE_0__.songsList, this.singId);
    this.isListShown = true;
  }
  hideSongList() {
    this.albumImage.style.display = 'block';
    this.timerBlock.style.visibility = 'visible';
    _audio_list_js__WEBPACK_IMPORTED_MODULE_1__.newAudioList.hideSongList();
    this.isListShown = false;
    this.isFavoritesShown = false;
  }
  showFavoritesList() {
    this.isListShown = false;
    this.albumImage.style.display = 'none';
    if (window.innerWidth < 501) {
      this.timerBlock.style.visibility = 'hidden';
    }
    _audio_list_js__WEBPACK_IMPORTED_MODULE_1__.newAudioList.showFavoritesList(_songs_js__WEBPACK_IMPORTED_MODULE_0__.songsList, this.singId);
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

/***/ }),

/***/ "./src/js/audio_list.js":
/*!******************************!*\
  !*** ./src/js/audio_list.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   newAudioList: () => (/* binding */ newAudioList)
/* harmony export */ });
/* harmony import */ var _audio_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./audio.js */ "./src/js/audio.js");


const AudioListClasses = {
  songsActive: "songs_active",
  songItem: "songs__item",
  songItemActive: "songs__item_active",
  songTitle: "songs__title",
  singSinger: "songs__singer"
};
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

/***/ }),

/***/ "./src/js/songs.js":
/*!*************************!*\
  !*** ./src/js/songs.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   songsList: () => (/* binding */ songsList)
/* harmony export */ });
/* harmony import */ var _audio_trek1_mp3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../audio/trek1.mp3 */ "./src/audio/trek1.mp3");
/* harmony import */ var _audio_trek2_mp3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../audio/trek2.mp3 */ "./src/audio/trek2.mp3");
/* harmony import */ var _audio_trek3_mp3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../audio/trek3.mp3 */ "./src/audio/trek3.mp3");
/* harmony import */ var _audio_trek4_mp3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../audio/trek4.mp3 */ "./src/audio/trek4.mp3");
/* harmony import */ var _audio_trek5_mp3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../audio/trek5.mp3 */ "./src/audio/trek5.mp3");
/* harmony import */ var _img_trek1_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../img/trek1.jpg */ "./src/img/trek1.jpg");
/* harmony import */ var _img_trek2_jpg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../img/trek2.jpg */ "./src/img/trek2.jpg");
/* harmony import */ var _img_trek3_jpg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../img/trek3.jpg */ "./src/img/trek3.jpg");
/* harmony import */ var _img_trek4_jpg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../img/trek4.jpg */ "./src/img/trek4.jpg");
/* harmony import */ var _img_trek5_jpg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../img/trek5.jpg */ "./src/img/trek5.jpg");











const songsList = [{
  "id": 0,
  "title": "Freak",
  "singer": "Sub Urban",
  "img": _img_trek1_jpg__WEBPACK_IMPORTED_MODULE_5__,
  "src": _audio_trek1_mp3__WEBPACK_IMPORTED_MODULE_0__,
  "favorite": false,
  "duration": "3:14"
}, {
  "id": 1,
  "title": "What a life",
  "singer": "Scarlet Pleasure",
  "img": _img_trek2_jpg__WEBPACK_IMPORTED_MODULE_6__,
  "src": _audio_trek2_mp3__WEBPACK_IMPORTED_MODULE_1__,
  "favorite": false,
  "duration": "3:05"
}, {
  "id": 2,
  "title": "Part of me",
  "singer": "Call Me Karizma, Three Days of Rain",
  "img": _img_trek3_jpg__WEBPACK_IMPORTED_MODULE_7__,
  "src": _audio_trek3_mp3__WEBPACK_IMPORTED_MODULE_2__,
  "favorite": false,
  "duration": "2:52"
}, {
  "id": 3,
  "title": "Sugar",
  "singer": "Zubi, anatu",
  "img": _img_trek4_jpg__WEBPACK_IMPORTED_MODULE_8__,
  "src": _audio_trek4_mp3__WEBPACK_IMPORTED_MODULE_3__,
  "favorite": false,
  "duration": "3:25"
}, {
  "id": 4,
  "title": "Lion",
  "singer": "Saint Mesa",
  "img": _img_trek5_jpg__WEBPACK_IMPORTED_MODULE_9__,
  "src": _audio_trek5_mp3__WEBPACK_IMPORTED_MODULE_4__,
  "favorite": false,
  "duration": "2:50"
}];

/***/ }),

/***/ "./src/audio/trek1.mp3":
/*!*****************************!*\
  !*** ./src/audio/trek1.mp3 ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "4fff3611205ae30ef5bc.mp3";

/***/ }),

/***/ "./src/audio/trek2.mp3":
/*!*****************************!*\
  !*** ./src/audio/trek2.mp3 ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "1442245658fcf3d7bb24.mp3";

/***/ }),

/***/ "./src/audio/trek3.mp3":
/*!*****************************!*\
  !*** ./src/audio/trek3.mp3 ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "bb770fbfed73006cb1cd.mp3";

/***/ }),

/***/ "./src/audio/trek4.mp3":
/*!*****************************!*\
  !*** ./src/audio/trek4.mp3 ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "43226437fe7971d27b9d.mp3";

/***/ }),

/***/ "./src/audio/trek5.mp3":
/*!*****************************!*\
  !*** ./src/audio/trek5.mp3 ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "2bd5d01bb38b3de57307.mp3";

/***/ }),

/***/ "./src/img/trek1.jpg":
/*!***************************!*\
  !*** ./src/img/trek1.jpg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "972ed5ff3dc040129fef.jpg";

/***/ }),

/***/ "./src/img/trek2.jpg":
/*!***************************!*\
  !*** ./src/img/trek2.jpg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "d718c4e0039f2c3211c2.jpg";

/***/ }),

/***/ "./src/img/trek3.jpg":
/*!***************************!*\
  !*** ./src/img/trek3.jpg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e62aa0ed221f7d12075d.jpg";

/***/ }),

/***/ "./src/img/trek4.jpg":
/*!***************************!*\
  !*** ./src/img/trek4.jpg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "8d5428d9beaf79846e33.jpg";

/***/ }),

/***/ "./src/img/trek5.jpg":
/*!***************************!*\
  !*** ./src/img/trek5.jpg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "7fd5575080c29a3be890.jpg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_audio_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/audio.js */ "./src/js/audio.js");
/* harmony import */ var _js_assessment_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/assessment.js */ "./src/js/assessment.js");


const newAudioPlayer = new _js_audio_js__WEBPACK_IMPORTED_MODULE_0__.AudioPlayer();
console.log(_js_assessment_js__WEBPACK_IMPORTED_MODULE_1__.selfAssessment);
})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!*****************************!*\
  !*** ./src/sass/style.scss ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map