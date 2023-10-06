export { GameTools };

const GameToolsConst = {
    imageHeart: [0, 0, 20, 15],
    topOffset: 10,
    leftOffset: 10,
    heartGap: 20,
}

class GameTools{
    constructor(game) {
        this.game = game;
        this.score = document.querySelector('.nav__score');
        this.buttonNewGame = document.querySelector('.nav__btn_new-game');
        this.heartImage = document.querySelector('.heart__img');

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

    createImagePositionArray(i) {
        const arr = [...GameToolsConst.imageHeart, GameToolsConst.leftOffset + i * GameToolsConst.heartGap, GameToolsConst.topOffset, GameToolsConst.imageHeart[2], GameToolsConst.imageHeart[3]];
        return arr;
    }

    drawGamePlayerLives() {
        for (let i = 0; i < this.game.player.lives; i += 1) {
            const imageConst = this.createImagePositionArray(i);
            this.game.context.drawImage(this.heartImage, ...imageConst);
        }
    }
}