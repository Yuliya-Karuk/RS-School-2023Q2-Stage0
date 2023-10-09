export { GameTools };

const GameToolsConst = {
    imageHeart: [0, 0, 20, 15],
    topOffset: 10,
    leftOffset: 10,
    heartGap: 20,
    startGameClass: "modal_inactive",
}

class GameTools {
    constructor(game) {
        this.game = game;
        this.score = document.querySelector('.nav__score');
        this.buttonNewGame = document.querySelector('.nav__btn_new-game');
        this.startModal = document.querySelector('.modal');
        this.buttonStartGame = document.querySelector('.start-popup__button');
        this.heartImage = document.querySelector('.heart-img');

        this.loadFont();

        this.buttonNewGame.addEventListener('click', (e) => this.startNewGame(e));
        this.buttonStartGame.addEventListener('click', (e) => this.startGame(e));
    }

    loadFont() {
        const ctx = this;
        const font  = new FontFace('Bitsumishi', 'url(src/fonts/BITSUMIS.TTF)');
        font.load().then(function() {
            document.fonts.add(font);
            ctx.game.context.letterSpacing = "0.075rem"
        })
    }

    showScore() {
        this.score.innerHTML = `${this.game.score}`;
    }

    drawText(fontSize, text, textX, textY, color ,shadow) {
        this.game.context.fillStyle = color;
        this.game.context.textAlign = 'center';
        this.game.context.font = `${fontSize} Bitsumishi`;
        this.game.context.fillText(`${text}`, textX, textY, this.game.width * 0.9);
    }

    drawGameOverText() {
        this.drawText('50px', 'Game Over!', this.game.width * 0.5, this.game.height * 0.5 - 50, '#ffff00');
        this.drawText('35px', `You lose! Your score ${this.game.score}`, this.game.width * 0.5, this.game.height * 0.5, '#ffffff');
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

    drawGameWinText() {
        this.game.gameWin = true;
        this.drawText('50px', 'You win!', this.game.width * 0.5, this.game.height * 0.5 - 50, '#ffff00');
        this.drawText('30px', 'If you want to continue, press Enter', this.game.width * 0.5, this.game.height * 0.5, '#ffffff');
        this.game.score += 1;
    }

    startNewGame(e) {
        e.preventDefault();
        if (e.pointerId === 0) this.game.restartGame();
        this.buttonNewGame.blur();
    }

    startGame(e) {
        e.preventDefault();
        this.buttonStartGame.blur();
        this.startModal.classList.add(GameToolsConst.startGameClass);
        this.game.context.shadowOffsetX = 1;
        this.game.context.shadowOffsetY = 2;
        this.game.context.shadowBlur = 6;
        this.game.context.shadowColor = "rgba(256, 256, 256, 1)";
        this.game.updateGame();
    }
}