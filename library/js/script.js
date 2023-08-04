/* BURGER MENU */
const activeClasses = {
    burgerMenu: "header-nav-active",
    burgerButton: "burger-button-active",
    overlay: "overlay-active",
}

class Burger {
    constructor() {
        this.burgerButton = document.querySelector(".burger-button"); // кнопка бургер меню
        this.burgerMenu = document.querySelector(".header-nav"); // меню навигации
        this.menuLinks = document.querySelectorAll(".nav-link"); // ссылки в меню
        this.overlay = document.querySelector(".overlay"); // прозрачный слой под бургер-меню
        this.bindListeners();
    }

    toggleBurgerMenu() {
        this.burgerMenu.classList.toggle(activeClasses.burgerMenu);
        this.burgerButton.classList.toggle(activeClasses.burgerButton);
        this.overlay.classList.toggle(activeClasses.overlay);
    }

    bindListeners() {
        const context = this;

        /* показать/скрыть бургер меню при клике мышкой на кнопку */
        this.burgerButton.addEventListener("click", () => context.toggleBurgerMenu());

        /* закрыть окно при нажатии на эск*/
        window.addEventListener("keydown", function(evt) {
            if (evt.keyCode === 27) {
                context.toggleBurgerMenu();
            }
        });

        /* закрыть бургер-меню при нажатии на вне меню */
        this.overlay.addEventListener("click", () => context.toggleBurgerMenu());

        /* закрыть бургер-меню при нажатии на ссылку */
        for (let i = 0; i < this.menuLinks.length; i++) {
            this.menuLinks[i].addEventListener("click", () => context.toggleBurgerMenu());
        }
    }
}

const newBurger = new Burger();
