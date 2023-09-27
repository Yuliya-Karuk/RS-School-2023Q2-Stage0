import { newPagination } from './pagination.js';
export { newSearch };

const SearchClasses = {
    API_KEY: 'LS-5GJspuCOXPYhOpfr1SmJ-fmLEq1LX5bvlR4mGjCM',
    BASIC_URL: 'https://api.unsplash.com/',
}

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
        this.searchForm.addEventListener("submit", (e) => context.startSearchPage(e));
        this.buttonSearch.addEventListener("click", (e) => context.startSearchPage(e));
        this.buttonSearchClear.addEventListener("click", () => context.clearInput());
        this.buttonRandomPhoto.addEventListener("click", () => context.fillRandomPage());
        this.buttonTopPhoto.addEventListener("click", () => context.fillTopPage());
        this.buttonPeoplePhoto.addEventListener("click", () => context.fillPeoplePage());
    }

    focusSearchLine() {
        this.searchInput.focus();
    }

    async getImages(url) {
        const res = await fetch(url);
        this.data = await res.json();
        this.showSearchImages(this.data.results);
        if (this.newRequest) newPagination.createPagination(this.data.total_pages, this.page);
    }

    async getPhoto(url) {
        const res = await fetch(url);
        this.data = await res.json();
        this.showSearchImages(this.data);
    }

    generateConst() {
        if (window.innerWidth <= 480) {
            this.numberOfRows = 1;
        };
        if (window.innerWidth <= 768 && window.innerWidth > 480) {
            this.numberOfRows = 2;
        };
        if (window.innerWidth > 768) {
            this.numberOfRows = 3;
        };
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
        this.showSearchImages(this.data.results);
    }

    showSearchImages(array) {
        this.searchResults.innerHTML = '';
        this.createRows();
        this.rows = document.querySelectorAll('.results__row');
        array.map((el, index) => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result');
            resultItem.classList.add(`${el.width <  el.height ? 'result_vertical' : 'result_horizontal'}`);

            const img = this.createImgElement(el);
            const info = this.createInfoElement(el);
            resultItem.append(img);
            resultItem.append(info);

            this.rows[index % this.numberOfRows].append(resultItem)

        });
    }

    createImgElement(elementData) {
        const imgWrapper = document.createElement('a');
        imgWrapper.classList.add('result__img-wrapper');
        imgWrapper.href = `${elementData.urls.regular}`;
        imgWrapper.target = '_blank';
        imgWrapper.innerHTML = `<img class="result__img" src="${elementData.urls.regular}" alt="image">`
        return imgWrapper;
    }

    createInfoElement(elementData) {
        const info = document.createElement('div');
        info.classList.add('result__info');

        const user = document.createElement('div');
        user.classList.add('result__author');
        user.insertAdjacentHTML("beforeend",
            `<img class="result__author-icon" src="src/img/icons/user.svg" width="35" height="35" alt="user icon">
            <div class="result__author-details">
                <p class="result__author-name">${elementData.user.first_name} ${(elementData.user.last_name) ? elementData.user.last_name : ''}</p>
                <a class="link result__author-instagram" href="https://www.instagram.com/${elementData.user.instagram_username}" target="_blank">${elementData.user.instagram_username}</a>
            </div>`
        );

        const likes = document.createElement('div');
        likes.classList.add('result__likes');
        likes.insertAdjacentHTML("beforeend",
            `<img class="result__likes-icon" src="src/img/icons/like.svg" width="14" height="14" alt="like icon">
            <p class="result__likes-number">${elementData.likes}</p>`
        );

        info.append(user);
        info.append(likes);

        return info;
    }

    startSearchPage(e) {
        e.preventDefault();
        const url = `${SearchClasses.BASIC_URL}search/photos?client_id=${SearchClasses.API_KEY}&page=${this.page}&per_page=15&query=${this.searchInput.value ? this.searchInput.value : this.startRequest}`;
        this.newRequest = true;
        this.getImages(url);
    }

    changeSearchPage() {
        const url = `${SearchClasses.BASIC_URL}search/photos?client_id=${SearchClasses.API_KEY}&page=${this.page}&per_page=15&query=${this.searchInput.value ? this.searchInput.value : this.startRequest}`;
        this.newRequest = false;
        this.getImages(url);
    }

    fillStartPage() {
        const url = `${SearchClasses.BASIC_URL}/photos/random?client_id=${SearchClasses.API_KEY}&query=${this.startRequest}&count=15`;
        this.getPhoto(url);
    }

    fillRandomPage() {
        const url = `${SearchClasses.BASIC_URL}/photos/random?client_id=${SearchClasses.API_KEY}&count=15`;
        this.getPhoto(url);
    }

    fillTopPage() {
        const url = `${SearchClasses.BASIC_URL}/photos?client_id=${SearchClasses.API_KEY}&per_page=10&order_by=popular`;
        this.getPhoto(url);
    }

    fillPeoplePage() {
        const url = `${SearchClasses.BASIC_URL}search/photos?client_id=${SearchClasses.API_KEY}&query=people&page=${this.page}&per_page=15`;
        this.getImages(url);
    }

    clearInput() {
        this.searchInput.value = '';
        this.buttonSearchClear.blur();
        this.fillStartPage();
    }
}

const newSearch = new Search();