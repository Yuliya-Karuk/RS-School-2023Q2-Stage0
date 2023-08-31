export {FadeClasses, Fade};

const FadeClasses = {
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
        prevEl.classList.add(FadeClasses.ANIMATE_FADE)
        prevEl.addEventListener("animationend", () => {
            for (let i = 0; i < context.fadeLists.length; i++) {
                context.fadeLists[i].classList.remove(FadeClasses.ANIMATE_FADE)
                context.fadeLists[i].classList.add(FadeClasses.NO_DISPLAY)
                context.fadeLists[i].classList.remove(FadeClasses.ACTIVE_CLASS)
            }
            currentEl.classList.toggle(FadeClasses.ACTIVE_CLASS)
            currentEl.classList.toggle(FadeClasses.NO_DISPLAY)
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