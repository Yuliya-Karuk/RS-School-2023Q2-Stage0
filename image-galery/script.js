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

const selfAssessment = "Image-gallery (70/60)\n1. Вёрстка (10)\n - на странице есть несколько фото и строка поиска +5\n - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5\n2. При загрузке приложения на странице отображаются полученные от API изображения (10)\n3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API (10)\n4. Поиск (30)\n - при открытии приложения курсор находится в поле ввода +5\n - есть placeholder +5\n - автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5\n - поисковый запрос можно отправить нажатием клавиши Enter +5\n - после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5\n - в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5\n5 Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения (10)\n - красивый дизайн\n - добавлено меню\n - добавлена пагинация с возможностью листать страницы";

/***/ }),

/***/ "./src/js/pagination.js":
/*!******************************!*\
  !*** ./src/js/pagination.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   newPagination: () => (/* binding */ newPagination)
/* harmony export */ });
/* harmony import */ var _search_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./search.js */ "./src/js/search.js");


const PaginationClasses = {
  PaginationActive: 'pagination_active'
};
class Pagination {
  constructor() {
    this.pagination = document.querySelector('.pagination');
    this.paginationList = document.querySelector(".pagination__list");
    this.buttonPrevious = document.querySelector('.pagination__btn_previous');
    this.buttonNext = document.querySelector('.pagination__btn_next');
    this.buttonFirst = document.querySelector('.pagination__btn_first');
    this.buttonLast = document.querySelector('.pagination__btn_last');
    this.paginationNumbers;
    this.startPage = 1;
    this.lastPage;
    this.buttons;
    this.arrayButtons;
    this.bindListeners();
  }
  createPaginationArray(startPage) {
    const paginationNumbers = [];
    for (let i = startPage; i <= this.lastPage; i += 1) {
      if (paginationNumbers.length < 5) paginationNumbers.push(i);
      if (paginationNumbers.length === 5 && this.lastPage > startPage + 4) {
        paginationNumbers.push('...');
        break;
      }
    }
    return paginationNumbers;
  }
  fillPaginationList(numbersArray) {
    this.paginationList.innerHTML = '';
    numbersArray.map(el => {
      const paginationItem = document.createElement('li');
      paginationItem.classList.add('pagination__item');
      if (el !== '...') paginationItem.innerHTML = `<button class="pagination__btn" id="${el}" type="button">${el}</button>`;
      if (el === '...') paginationItem.innerHTML = `<button class="pagination__btn" id="more" type="button" disabled>${el}</button>`;
      this.paginationList.append(paginationItem);
    });
    this.buttons = document.querySelectorAll(".pagination__btn");
    this.arrayButtons = this.paginationList.querySelectorAll(".pagination__btn");
  }
  makeActiveButton(active) {
    for (let i = 0; i < this.buttons.length; i += 1) {
      this.buttons[i].classList.remove('pagination__btn_active');
    }
    const activeBtn = document.querySelector(`[id='${active}']`);
    activeBtn.classList.add('pagination__btn_active');
  }
  makeDisabledButton(active) {
    for (let i = 0; i < this.buttons.length; i += 1) {
      this.buttons[i].removeAttribute('disabled');
      if (this.buttons[i].id === active) this.buttons[i].setAttribute('disabled', 'disabled');
      if (active === this.startPage) {
        this.buttonPrevious.setAttribute('disabled', 'disabled');
        this.buttonFirst.setAttribute('disabled', 'disabled');
      }
      if (active === this.lastPage) {
        this.buttonNext.setAttribute('disabled', 'disabled');
        this.buttonLast.setAttribute('disabled', 'disabled');
      }
    }
  }
  createPagination(totalPages, active) {
    this.lastPage = totalPages;
    this.pagination.classList.add(PaginationClasses.PaginationActive);
    this.changePaginationList(active);
    this.makeActiveButton(active);
    this.makeDisabledButton(active);
  }
  changePaginationList(newPage) {
    this.paginationNumbers = this.createPaginationArray(newPage);
    this.fillPaginationList(this.paginationNumbers);
    this.bindPaginationListListeners();
  }
  changePage(newPage) {
    let value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    _search_js__WEBPACK_IMPORTED_MODULE_0__.newSearch.page = newPage;
    _search_js__WEBPACK_IMPORTED_MODULE_0__.newSearch.changeSearchPage();
    if (this.paginationNumbers.includes(_search_js__WEBPACK_IMPORTED_MODULE_0__.newSearch.page)) {
      this.makeActiveButton(_search_js__WEBPACK_IMPORTED_MODULE_0__.newSearch.page);
    } else {
      this.changePaginationList(value < 0 && _search_js__WEBPACK_IMPORTED_MODULE_0__.newSearch.page !== this.startPage || _search_js__WEBPACK_IMPORTED_MODULE_0__.newSearch.page === this.lastPage ? _search_js__WEBPACK_IMPORTED_MODULE_0__.newSearch.page - 4 : _search_js__WEBPACK_IMPORTED_MODULE_0__.newSearch.page);
      this.makeActiveButton(_search_js__WEBPACK_IMPORTED_MODULE_0__.newSearch.page);
    }
    this.makeDisabledButton(_search_js__WEBPACK_IMPORTED_MODULE_0__.newSearch.page);
  }
  hidePagination() {
    this.pagination.classList.remove(PaginationClasses.PaginationActive);
  }
  bindListeners() {
    const context = this;
    this.buttonPrevious.addEventListener('click', () => context.changePage(_search_js__WEBPACK_IMPORTED_MODULE_0__.newSearch.page - 1, -4));
    this.buttonNext.addEventListener('click', () => context.changePage(_search_js__WEBPACK_IMPORTED_MODULE_0__.newSearch.page + 1, 4));
    this.buttonLast.addEventListener('click', () => context.changePage(this.lastPage));
    this.buttonFirst.addEventListener('click', () => context.changePage(this.startPage));
  }
  bindPaginationListListeners() {
    const context = this;
    for (let i = 0; i < this.arrayButtons.length; i += 1) {
      this.arrayButtons[i].addEventListener('click', () => {
        context.changePage(Number(this.arrayButtons[i].id));
      });
    }
  }
}
const newPagination = new Pagination();

/***/ }),

/***/ "./src/js/search.js":
/*!**************************!*\
  !*** ./src/js/search.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   newSearch: () => (/* binding */ newSearch)
/* harmony export */ });
/* harmony import */ var _pagination_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pagination.js */ "./src/js/pagination.js");
/* harmony import */ var _img_icons_user_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../img/icons/user.svg */ "./src/img/icons/user.svg");
/* harmony import */ var _img_icons_like_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../img/icons/like.svg */ "./src/img/icons/like.svg");




const SearchClasses = {
  ApiKey: 'LS-5GJspuCOXPYhOpfr1SmJ-fmLEq1LX5bvlR4mGjCM',
  BasicUrl: 'https://api.unsplash.com/',
  ResultsErrorClass: 'results_error',
  ErrorRequestMessage: 'The API request limit has been exceeded. Please try again later',
  ErrorImageMessage: 'There are no images found for your request. Please try another request'
};
class Search {
  constructor() {
    this.searchForm = document.querySelector('.search__form');
    this.searchInput = document.querySelector(".search__input");
    this.searchResults = document.querySelector('.results');
    this.buttonSearch = document.querySelector('.search__btn-search');
    this.buttonSearchClear = document.querySelector('.search__btn-clear');
    this.buttonRandomPhoto = document.querySelector(".navigation__btn_random");
    this.buttonTopPhoto = document.querySelector(".navigation__btn_top");
    this.buttonPeoplePhoto = document.querySelector(".navigation__btn_people");
    this.paginationList = document.querySelector(".pagination__list");
    this.startRequest = 'sea';
    this.numberOfRows;
    this.page = 1;
    this.data;
    this.newRequest = false;
    this.bindListeners();
  }
  bindListeners() {
    const context = this;
    document.addEventListener("DOMContentLoaded", () => context.focusSearchLine());
    document.addEventListener("DOMContentLoaded", () => context.fillStartPage());
    document.addEventListener("DOMContentLoaded", () => context.generateConst());
    window.addEventListener('resize', () => context.changeLayout());
    this.searchForm.addEventListener("submit", e => context.startSearchPage(e));
    this.buttonSearch.addEventListener("click", e => context.startSearchPage(e));
    this.buttonSearchClear.addEventListener("click", () => context.clearInput());
    this.buttonRandomPhoto.addEventListener("click", () => context.fillRandomPage());
    this.buttonTopPhoto.addEventListener("click", () => context.fillTopPage());
    this.buttonPeoplePhoto.addEventListener("click", () => context.fillPeoplePage());
  }
  focusSearchLine() {
    this.searchInput.focus();
  }
  sortArray(array) {
    const sortedArray = array.sort((a, b) => b.height / b.width - a.height / a.width);
    const resultArray = [...sortedArray.slice(0, 3), ...sortedArray.slice(12).reverse(), ...sortedArray.slice(3, 6), ...sortedArray.slice(9, 12).reverse(), ...sortedArray.slice(6, 9).reverse()];
    return resultArray;
  }
  async getImages(url) {
    try {
      const res = await fetch(url);
      this.data = await res.json();
      if (this.data.total > 0) {
        this.showSearchImages(this.sortArray(this.data.results));
        if (this.newRequest) _pagination_js__WEBPACK_IMPORTED_MODULE_0__.newPagination.createPagination(this.data.total_pages, this.page);
      } else {
        this.showError(SearchClasses.ErrorImageMessage);
      }
    } catch (error) {
      this.showError(SearchClasses.ErrorRequestMessage);
    }
  }
  async getPhoto(url) {
    try {
      const res = await fetch(url);
      this.data = await res.json();
      this.showSearchImages(this.sortArray(this.data));
    } catch (error) {
      this.showError(SearchClasses.ErrorRequestMessage);
    }
  }
  generateConst() {
    if (window.innerWidth <= 480) {
      this.numberOfRows = 1;
    }
    ;
    if (window.innerWidth <= 768 && window.innerWidth > 480) {
      this.numberOfRows = 2;
    }
    ;
    if (window.innerWidth > 768) {
      this.numberOfRows = 3;
    }
    ;
  }
  createRows() {
    for (let i = 0; i < this.numberOfRows; i += 1) {
      const resultsRow = document.createElement('div');
      resultsRow.classList.add('results__row');
      this.searchResults.append(resultsRow);
    }
  }
  changeLayout() {
    this.generateConst();
    this.showSearchImages(this.data.results ? this.data.results : this.data);
  }
  showSearchImages(array) {
    this.searchResults.innerHTML = '';
    this.createRows();
    this.rows = document.querySelectorAll('.results__row');
    array.map((el, index) => {
      const resultItem = document.createElement('div');
      resultItem.classList.add('result');
      const img = this.createImgElement(el);
      const info = this.createInfoElement(el);
      resultItem.append(img);
      resultItem.append(info);
      this.rows[index % this.numberOfRows].append(resultItem);
    });
  }
  createImgElement(elementData) {
    const imgWrapper = document.createElement('a');
    imgWrapper.classList.add('result__img-wrapper');
    imgWrapper.href = `${elementData.urls.regular}`;
    imgWrapper.target = '_blank';
    imgWrapper.innerHTML = `<img class="result__img" src="${elementData.urls.regular}" alt="image">`;
    return imgWrapper;
  }
  createInfoElement(elementData) {
    const info = document.createElement('div');
    info.classList.add('result__info');
    const user = document.createElement('div');
    user.classList.add('result__author');
    user.insertAdjacentHTML("beforeend", `<img class="result__author-icon" src="${_img_icons_user_svg__WEBPACK_IMPORTED_MODULE_1__}" width="35" height="35" alt="user icon">
            <div class="result__author-details">
                <p class="result__author-name">${elementData.user.first_name} ${elementData.user.last_name ? elementData.user.last_name : ''}</p>
                <a class="link result__author-instagram" href="https://www.instagram.com/${elementData.user.instagram_username}" target="_blank">${elementData.user.instagram_username ? elementData.user.instagram_username : ''}</a>
            </div>`);
    const likes = document.createElement('div');
    likes.classList.add('result__likes');
    likes.insertAdjacentHTML("beforeend", `<img class="result__likes-icon" src="${_img_icons_like_svg__WEBPACK_IMPORTED_MODULE_2__}" width="14" height="14" alt="like icon">
            <p class="result__likes-number">${elementData.likes}</p>`);
    info.append(user);
    info.append(likes);
    return info;
  }
  startSearchPage(e) {
    e.preventDefault();
    this.page = 1;
    const url = `${SearchClasses.BasicUrl}search/photos?client_id=${SearchClasses.ApiKey}&page=${this.page}&per_page=15&query=${this.searchInput.value ? this.searchInput.value : this.startRequest}`;
    this.newRequest = true;
    this.getImages(url);
  }
  changeSearchPage() {
    const url = `${SearchClasses.BasicUrl}search/photos?client_id=${SearchClasses.ApiKey}&page=${this.page}&per_page=15&query=${this.searchInput.value ? this.searchInput.value : this.startRequest}`;
    this.newRequest = false;
    this.getImages(url);
  }
  fillStartPage() {
    const url = `${SearchClasses.BasicUrl}/photos/random?client_id=${SearchClasses.ApiKey}&query=${this.startRequest}&count=15`;
    this.getPhoto(url);
    _pagination_js__WEBPACK_IMPORTED_MODULE_0__.newPagination.hidePagination();
  }
  fillRandomPage() {
    const url = `${SearchClasses.BasicUrl}/photos/random?client_id=${SearchClasses.ApiKey}&count=15`;
    this.getPhoto(url);
    _pagination_js__WEBPACK_IMPORTED_MODULE_0__.newPagination.hidePagination();
  }
  fillTopPage() {
    const url = `${SearchClasses.BasicUrl}/photos?client_id=${SearchClasses.ApiKey}&per_page=15&order_by=popular`;
    this.getPhoto(url);
    _pagination_js__WEBPACK_IMPORTED_MODULE_0__.newPagination.hidePagination();
  }
  fillPeoplePage() {
    this.page = 1;
    const url = `${SearchClasses.BasicUrl}search/photos?client_id=${SearchClasses.ApiKey}&query=people&page=${this.page}&per_page=15`;
    this.newRequest = true;
    this.getImages(url);
  }
  clearInput() {
    this.searchInput.value = '';
    this.buttonSearchClear.blur();
    this.fillStartPage();
  }
  showError(errorMessage) {
    this.searchResults.innerHTML = '';
    this.searchResults.classList.add(SearchClasses.ResultsErrorClass);
    const errorBlock = document.createElement('h3');
    errorBlock.classList.add('error');
    errorBlock.innerHTML = errorMessage;
    this.searchResults.append(errorBlock);
    _pagination_js__WEBPACK_IMPORTED_MODULE_0__.newPagination.hidePagination();
  }
}
const newSearch = new Search();

/***/ }),

/***/ "./src/img/icons/like.svg":
/*!********************************!*\
  !*** ./src/img/icons/like.svg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "60a13665246ea20f1505.svg";

/***/ }),

/***/ "./src/img/icons/user.svg":
/*!********************************!*\
  !*** ./src/img/icons/user.svg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "b184ac8a4fea96e36071.svg";

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
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_search_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/search.js */ "./src/js/search.js");
/* harmony import */ var _js_assessment_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/assessment.js */ "./src/js/assessment.js");


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
//# sourceMappingURL=script.js.map