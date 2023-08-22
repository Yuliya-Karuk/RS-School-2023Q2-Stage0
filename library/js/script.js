/* BURGER MENU */
const activeClasses = {
    burgerMenu: "navigation_active",
    burgerButton: "burger_active",
    body: "no-scroll",
}

class Burger {
    constructor() {
        this.burgerButton = document.querySelector(".burger"); // кнопка бургер меню
        this.burgerMenu = document.querySelector(".navigation"); // меню навигации
        this.menuLinks = document.querySelectorAll(".navigation__link"); // ссылки в меню
        this.body =  document.querySelector("body");
        this.bindListeners();
    }

    toggleBurgerMenu() {
        this.burgerMenu.classList.add("navigation_start");
        this.burgerMenu.classList.toggle(activeClasses.burgerMenu);
        this.burgerButton.classList.toggle(activeClasses.burgerButton);
        this.body.classList.toggle(activeClasses.body);
    }

    bindListeners() {
        const context = this;

        /* показать/скрыть бургер меню при клике мышкой на кнопку */
        this.burgerButton.addEventListener("click", () => context.toggleBurgerMenu());

        /* закрыть окно при нажатии на эск*/
        window.addEventListener("keydown", function(e) {
            if (e.keyCode === 27 && context.burgerMenu.classList.contains(activeClasses.burgerMenu)) {
                context.toggleBurgerMenu();
            }
        });

        // /* закрыть бургер-меню при нажатии на вне меню */
        document.addEventListener("click", function(e) {
            if (!e.target.classList.contains("header-nav") && context.burgerMenu.classList.contains(activeClasses.burgerMenu) && !context.burgerButton.contains(e.target)) context.toggleBurgerMenu();
        });

        /* закрыть бургер-меню при нажатии на ссылку */
        for (let i = 0; i < this.menuLinks.length; i++) {
            this.menuLinks[i].addEventListener("click", () => context.toggleBurgerMenu());
        }
    }
}

const newBurger = new Burger();


/* Slider */

const CssAnimation = {
    ANIMATE_LEFT : "animate-left",
    ANIMATE_RIGHT : "animate-right",
    NO_TRANSITION : "no-transition",
}

class Slider {
    constructor() {
        this.sliderButtonLeft = document.querySelector(".slider__btn_left");
        this.sliderButtonRight = document.querySelector(".slider__btn_right");
        this.slider = document.querySelector(".slider__images");
        this.paginationBtns =  document.querySelectorAll(".pgn__button");
        this.paginationBtnActive =  document.querySelector(".pgn__button_active");
        this.bindListeners();
        this.sliderItems = 4;
        this.currentSlide = 0;
        this.offset;
    }

    generateConst() {
        if (window.innerWidth <= 768) {
            this.offset = 100;
        };
        if (window.innerWidth <= 1024 && window.innerWidth > 768) {
            this.offset = 50;
        };
        if (window.innerWidth > 1024) {
            this.offset = 34;
        };
    }

    fillPagination() {
        for (let i = 0; i < this.paginationBtns.length; i++) {
            this.paginationBtns[i].removeAttribute("disabled");
        }
        this.paginationBtns[this.currentSlide].setAttribute("disabled", "disabled");
    }

    move() {
        if (this.currentSlide > 0 || this.currentSlide < 4) {
            this.sliderButtonLeft.removeAttribute("disabled");
            this.sliderButtonRight.removeAttribute("disabled");
        }
        if (this.currentSlide === 4) {
            this.sliderButtonRight.setAttribute("disabled", "disabled");
        }
        if (this.currentSlide === 0) {
            this.sliderButtonLeft.setAttribute("disabled", "disabled");
        }
        this.slider.style.transform = `translateX(-${this.currentSlide * this.offset}%)`;
    }

    bindListeners() {
        const context = this;
        document.addEventListener("DOMContentLoaded", () => context.generateConst());
        window.addEventListener('resize', function() {
            document.location.reload();
            context.generateConst();
        });

        for (let i = 0; i < this.paginationBtns.length; i++) {
            this.paginationBtns[i].addEventListener("click", function(e) {
                context.currentSlide = i;
                context.move();
                context.fillPagination();
            });
        };

        this.sliderButtonRight.addEventListener("click", function() {
            context.currentSlide += 1;
            context.move();
            context.fillPagination();
        });

        this.sliderButtonLeft.addEventListener("click", function() {
            context.currentSlide -= 1;
            context.move();
            context.fillPagination();
        });
    }
}

const newSlider = new Slider();

/* Season */

const FadeAnimation = {
    ANIMATE_FADE : "animate-fade",
    ACTIVE_CLASS : "books_active",
    NO_DISPLAY : "visually-hidden",
}

class Fade {
    constructor() {
        this.fadeTabs = document.querySelectorAll(".filter__label");
        this.fadeLists = document.querySelectorAll(".books");
        this.prevList = document.querySelector(".books_active");
        this.bindListeners();
    }

    handlerAnimation(prevEl, currentEl, callback) {
        const context = this;
        prevEl.classList.add(FadeAnimation.ANIMATE_FADE)
        console.log(currentEl)
        prevEl.addEventListener("animationend", () => {
            for (let i = 0; i < context.fadeLists.length; i++) {
                context.fadeLists[i].classList.remove(FadeAnimation.ANIMATE_FADE)
                context.fadeLists[i].classList.add(FadeAnimation.NO_DISPLAY)
                context.fadeLists[i].classList.remove(FadeAnimation.ACTIVE_CLASS)
            }
            currentEl.classList.toggle(FadeAnimation.ACTIVE_CLASS)
            currentEl.classList.toggle(FadeAnimation.NO_DISPLAY)
            callback(currentEl, context);
        })
    }

    changePrev(currentEl, context) {
        context.prevList = currentEl;
    }

    bindListeners() {
        const context = this;
        for (let i = 0; i < this.fadeTabs.length; i++) {
            this.fadeTabs[i].addEventListener("click", () => {
                context.currentList = this.fadeLists[i];
                context.handlerAnimation(this.prevList, this.currentList, this.changePrev);
            })
        }
    }
}

const newFade = new Fade();

