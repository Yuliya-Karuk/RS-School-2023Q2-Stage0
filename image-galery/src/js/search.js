import { newPagination } from './pagination.js';
export { newSearch };

const SearchClasses = {
    ApiKey: 'LS-5GJspuCOXPYhOpfr1SmJ-fmLEq1LX5bvlR4mGjCM',
    BasicUrl: 'https://api.unsplash.com/',
    ResultsErrorClass: 'results_error',
    ErrorRequestMessage : 'The API request limit has been exceeded. Please try again later',
    ErrorImageMessage : 'There are no images found for your request. Please try another request'
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
                if (this.newRequest) newPagination.createPagination(this.data.total_pages, this.page);
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
                <a class="link result__author-instagram" href="https://www.instagram.com/${elementData.user.instagram_username}" target="_blank">${elementData.user.instagram_username ? elementData.user.instagram_username : ''}</a>
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
        newPagination.hidePagination();
    }

    fillRandomPage() {
        const url = `${SearchClasses.BasicUrl}/photos/random?client_id=${SearchClasses.ApiKey}&count=15`;
        this.getPhoto(url);
        newPagination.hidePagination();
    }

    fillTopPage() {
        const url = `${SearchClasses.BasicUrl}/photos?client_id=${SearchClasses.ApiKey}&per_page=15&order_by=popular`;
        this.getPhoto(url);
        newPagination.hidePagination();
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
        newPagination.hidePagination();
    }
}

const newSearch = new Search();