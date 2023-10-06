export { GameTools };

class GameTools{
    constructor(game) {
        this.game = game;
        this.score = document.querySelector('.nav__score');
        this.buttonNewGame = document.querySelector('.nav__btn_new-game');

        this.loadFont();

        this.buttonNewGame.addEventListener('click', (e) => {
            e.preventDefault();
            this.game.restartGame()
        });
    }

    loadFont() {
        const ctx = this;
        const font  = new FontFace('Bitsumishi', 'url(src/fonts/BITSUMIS.TTF)');
        font.load().then(function() {
            document.fonts.add(font);
            ctx.game.context.font = "50px Bitsumishi";
        })
    }

    showScore() {
        this.score.innerHTML = `${this.game.score}`;
    }

    drawGameOverText() {
        this.game.context.fillText('Game Over!', this.game.width * 0.5, this.game.height * 0.5);
        this.game.context.textAlign = 'center';
    }

    drawGamePlayerLives() {
        for (let i = 0; i < this.game.player.lives; i += 1) {
            this.game.context.fillRect(20 + 16 * i, 20, 8, 25);
        }
    }
}