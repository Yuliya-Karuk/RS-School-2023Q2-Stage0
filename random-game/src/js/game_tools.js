import { newLocalStorageUtils } from './LS.js';
export { GameTools };

const GameToolsConst = {
    imageHeart: [0, 0, 20, 15],
    topOffset: 10,
    leftOffset: 10,
    heartGap: 20,
    startGameClass: "modal_inactive",
    numberOfResults: 10,
    colorPrimary: '#FFFF00',
    colorWhite: '#FFFFFF',
}

class GameTools {
    constructor(game) {
        this.game = game;
        this.score = document.querySelector('.nav__score');
        this.bestScore = document.querySelector('.nav__best');

        this.startModal = document.querySelector('.modal_start');
        this.buttonStartGame = document.querySelector('.modal-start__button');
        this.buttonStartGame.addEventListener('click', (e) => this.startGame(e));

        this.scoreModal = document.querySelector('.modal_score');
        this.scoreList = document.querySelector('.modal-score__list');
        this.buttonTryAgain = document.querySelector('.modal-score__button');
        this.buttonTryAgain.addEventListener('click', (e) => this.startNewGame(e));

        this.gameOverModal = document.querySelector('.modal_gameover');
        this.gameOverTextScore = document.querySelector('.modal-gameover__score');
        this.gameOverNewGame = document.querySelector('.modal-gameover__button_game');
        this.gameOverScore = document.querySelector('.modal-gameover__button_score');
        this.gameOverNewGame.addEventListener('click', (e) => this.startNewGame(e));
        this.gameOverScore.addEventListener('click', (e) => this.showScoreTable(e));


        this.heartImage = document.querySelector('.heart-img');

        this.loadFont();
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
        this.bestScore.innerHTML = newLocalStorageUtils.getBest();
    }

    drawText(fontSize, text, textX, textY, color) {
        this.game.context.fillStyle = color;
        this.game.context.textAlign = 'center';
        this.game.context.font = `${fontSize} Bitsumishi`;
        this.game.context.fillText(`${text}`, textX, textY, this.game.width * 0.9);
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
        this.drawText('50px', 'You win!', this.game.width * 0.5, this.game.height * 0.5 - 50, GameToolsConst.colorPrimary);
        this.drawText('30px', 'If you want to continue, press Enter', this.game.width * 0.5, this.game.height * 0.5, GameToolsConst.colorWhite);
        this.game.score += 1;
    }

    startNewGame(e) {
        e.preventDefault();
        this.game.restartGame();
        this.gameOverModal.classList.add(GameToolsConst.startGameClass);
        this.scoreModal.classList.add(GameToolsConst.startGameClass);
    }

    startGame(e) {
        e.preventDefault();
        this.buttonStartGame.blur();
        this.startModal.classList.add(GameToolsConst.startGameClass);
        this.game.context.shadowOffsetX = 1;
        this.game.context.shadowOffsetY = 2;
        this.game.context.shadowBlur = 6;
        this.game.context.shadowColor = GameToolsConst.colorWhite;
        this.game.updateGame();
    }

    showGameOverModal() {
        this.gameOverModal.classList.remove(GameToolsConst.startGameClass);
        this.gameOverTextScore.innerHTML = `You lose! Your score - ${this.game.score}`;
    }

    showScoreTable() {
        this.gameOverModal.classList.add(GameToolsConst.startGameClass);
        const results = newLocalStorageUtils.getResults();
        this.renderScoreTable(results)
        this.scoreModal.classList.remove(GameToolsConst.startGameClass);
    }

    renderScoreTable(arr) {
        this.scoreList.innerHTML = '';
        for (let i = 0; i < GameToolsConst.numberOfResults; i += 1) {
            const resultItem = document.createElement('li');
            resultItem.classList.add('modal-score__item');
            if (arr[i]) {
                resultItem.innerHTML = arr[i];
            } else {
                resultItem.innerHTML = 0;
            }
            this.scoreList.append(resultItem);
        }
    }
}