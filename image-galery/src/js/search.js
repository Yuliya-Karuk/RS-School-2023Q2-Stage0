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
            const imgWrapper = document.createElement('div');
            imgWrapper.classList.add('results__img-wrapper');
            imgWrapper.classList.add(`${(el.width > el.height) ? 'results__img-wrapper_horizontal' : 'results__img-wrapper_vertical'}`);

            const img = this.createImgElement(el);
            imgWrapper.append(img);

            this.searchResults.append(imgWrapper);

        });
    }

    createImgElement(elementData) {
        const img = document.createElement('img');
        img.classList.add('results__img');
        // img.classList.add(`${(elementData.width > elementData.height) ? 'results__img_horizontal' : 'results__img_vertical'}`);
        img.src = `${elementData.urls.regular}`;
        img.alt = `image`;
        return img;
    }

}