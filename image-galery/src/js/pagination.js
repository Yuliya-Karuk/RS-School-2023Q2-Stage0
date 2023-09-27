import { newSearch } from './search.js';
export { newPagination };

const PaginationClasses = {
    PaginationActive: 'pagination_active',
}

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
        for (let i = startPage; i <= this.lastPage; i +=1 ) {
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
        numbersArray.map((el) => {
            const paginationItem = document.createElement('li');
            paginationItem.classList.add('pagination__item');
            if (el !== '...') paginationItem.innerHTML = `<button class="pagination__btn" id="${el}" type="button">${el}</button>`;
            if (el === '...') paginationItem.innerHTML = `<button class="pagination__btn" id="more" type="button" disabled>${el}</button>`;
            this.paginationList.append(paginationItem)
        });
        this.buttons = document.querySelectorAll(".pagination__btn");
        this.arrayButtons = this.paginationList.querySelectorAll(".pagination__btn");
    }

    makeActiveButton(active) {
        for (let i = 0; i < this.buttons.length; i += 1) {
            this.buttons[i].classList.remove('pagination__btn_active')
        }
        const activeBtn = document.querySelector(`[id='${active}']`);
        activeBtn.classList.add('pagination__btn_active');
    }

    makeDisabledButton(active) {
        for (let i = 0; i < this.buttons.length; i +=1 ) {
            this.buttons[i].removeAttribute('disabled')
            if (this.buttons[i].id === active) this.buttons[i].setAttribute('disabled', 'disabled')
            if (active === this.startPage) {
                this.buttonPrevious.setAttribute('disabled', 'disabled');
                this.buttonFirst.setAttribute('disabled', 'disabled')
            }
            if (active === this.lastPage) {
                this.buttonNext.setAttribute('disabled', 'disabled');
                this.buttonLast.setAttribute('disabled', 'disabled')
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

    changePage(newPage, value = 0) {
        newSearch.page = newPage;
        newSearch.changeSearchPage();
        if (this.paginationNumbers.includes(newSearch.page)) {
            this.makeActiveButton(newSearch.page);
        } else {
            this.changePaginationList(((value < 0 && newSearch.page !== this.startPage) || newSearch.page === this.lastPage) ? newSearch.page - 4 : newSearch.page);
            this.makeActiveButton(newSearch.page);
        }
        this.makeDisabledButton(newSearch.page);
    }


    bindListeners() {
        const context = this;
        this.buttonPrevious.addEventListener('click', () => context.changePage((newSearch.page - 1), -4));
        this.buttonNext.addEventListener('click', () => context.changePage(newSearch.page + 1, 4));
        this.buttonLast.addEventListener('click', () => context.changePage(this.lastPage));
        this.buttonFirst.addEventListener('click', () => context.changePage(this.startPage));
    }

    bindPaginationListListeners() {
        const context = this;
        for (let i = 0; i < this.arrayButtons.length; i +=1 ) {
            this.arrayButtons[i].addEventListener('click', () => {
                context.changePage(Number(this.arrayButtons[i].id))
            });
        }
    }
}

const newPagination = new Pagination();