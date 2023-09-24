export { Search };

const SearchClasses = {
    API_KEY: 'LS-5GJspuCOXPYhOpfr1SmJ-fmLEq1LX5bvlR4mGjCM',
    BASIC_URL: 'https://api.unsplash.com/'
}

class Search {
    constructor() {
        this.searchForm = document.querySelector('.search__form');
        this.searchInput = document.querySelector(".search__input");
        this.searchResults = document.querySelector('.results');
        this.buttonSearchClear = document.querySelector('search__btn-clear');

        this.bindListeners();
    }

    bindListeners() {
        const context = this;

        document.addEventListener("DOMContentLoaded", () => context.focusSearchLine());
        this.searchForm.addEventListener("submit", (e) => context.getImages(e));
    }

    focusSearchLine() {
        this.searchInput.focus();
    }

    async getImages(e) {
        e.preventDefault();
        const searchUrl = `${SearchClasses.BASIC_URL}search/photos?client_id=${SearchClasses.API_KEY}&query=${this.searchInput.value}`;
        const res = await fetch(searchUrl);
        const data = await res.json();
        console.log(data.results[0])
        this.showSearchImages(data.results);
    }

    showSearchImages(array) {
        this.searchResults.innerHTML = '';
        array.map((el) => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result');
            resultItem.classList.add(`${(el.width > el.height) ? 'result_horizontal' : 'result_vertical'}`);

            const img = this.createImgElement(el);
            const info = this.createInfoElement(el);
            resultItem.append(img);
            resultItem.append(info);

            this.searchResults.append(resultItem);
        });
    }

    createImgElement(elementData) {
        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('result__img-wrapper');
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
                <a class="link result__author-instagram" href="https://www.instagram.com/${elementData.user.instagram_username}">${elementData.user.instagram_username}</a>
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

}