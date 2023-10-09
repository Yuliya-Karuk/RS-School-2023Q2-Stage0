import { Player } from './player.js';
import { Enemy } from './enemy.js';
import { GameTools } from './game_tools.js';
import { Monster } from './enemy_monster.js';
import { newLocalStorageUtils } from './LS.js';
export { Game };

const GameConst = {
    GameWidth : window.innerWidth * 0.8,
    GameHeight : window.innerHeight * 0.8,
    numberOfEnemy : 7,
    gameWinScore: 10,
}

class Game {
    constructor() {
        this.canvas = document.querySelector('.game');
        this.canvas.width = GameConst.GameWidth > 600 ? 600 : GameConst.GameWidth;
        this.canvas.height = GameConst.GameHeight;
        this.context = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.player = new Player(this);
        this.enemyPool = [];
        this.enemyLocation = [];
        this.attackIsStarted = false;

        this.buttonKeys = [];
        this.buttonIsPressed = false;

        this.gameTools = new GameTools(this);
        this.score = 0;
        this.gameOver = false;
        this.gameWin = false;

        this.frameAnimationUpdate = false;
        this.frameTimer = 0;
        this.frameInterval = 300;
        this.timeInterval = 20;

        this.createEnemyPool();

        window.addEventListener('keydown', (e) => {
            if (this.buttonKeys.indexOf(e.key) === -1) this.buttonKeys.push(e.key);
            if (e.keyCode === 32 &&  ! this.buttonIsPressed) this.player.shootBullet();
            if (this.gameWin && e.keyCode === 13) this.continueGame();
            this.buttonIsPressed = true;
        })
        window.addEventListener('keyup', (e) => {
            this.buttonIsPressed = false;
            const index = this.buttonKeys.indexOf(e.key);
            if (index > -1) this.buttonKeys.splice(index, 1);
        })
        window.addEventListener('resize', () => location.reload());
    }

    render() {
        this.countTimer();
        this.gameTools.showScore();
        this.gameTools.drawGamePlayerLives();

        this.player.drawPlayer(this.context);
        this.player.updatePlayerLocation();

        this.player.bulletPool.forEach((bullet) => {
            bullet.drawBullet(this.context);
            bullet.updateBulletLocation();
        })
        if (!this.attackIsStarted) {
            this.startEnemyAttack();
            this.attackIsStarted = true;
        }
        this.enemyPool.forEach((enemy) => {
            enemy.drawEnemy(this.context);
            enemy.updateEnemyLocation();
        })

        if (this.gameOver) {
            newLocalStorageUtils.saveGameResult(this.score);
            this.gameTools.showGameOverModal();
        }
        if (this.score === GameConst.gameWinScore) this.gameTools.drawGameWinText();
        if (this.score > 0 && this.score % 50 === 0) this.increaseEnemiesSpeed();
    }

    updateGame() {
        const ctx = this;
        ctx.context.clearRect(0, 0, ctx.width, ctx.height);
        ctx.render();

        if (!ctx.gameWin && !ctx.gameOver) window.requestAnimationFrame(() => ctx.updateGame());
    }

    createEnemyPool() {
        for (let i = 0; i < GameConst.numberOfEnemy; i += 1) {
            this.enemyPool.push(new Monster(this));
        }
    }

    async startEnemyAttack() {
        for (let i = 0; i < this.enemyPool.length; i += 1) {
            await this.enemyPool[i].resolveEnemy();
            this.enemyLocation.push(this.enemyPool[i].x)
        }
    }

    checkCollision(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        )
    }

    restartGame() {
        this.player.restartPlayer();
        this.score = 0;
        this.enemyPool = [];
        this.createEnemyPool();
        this.attackIsStarted = false;
        this.gameOver = false;
        this.gameWin = false;
        this.updateGame();
    }

    continueGame() {
        this.gameWin = false;
        this.updateGame();
    }

    countTimer() {
        if (this.frameTimer > this.frameInterval) {
            this.frameAnimationUpdate = true;
            this.frameTimer = 0;
        } else {
            this.frameAnimationUpdate = false;
            this.frameTimer += this.timeInterval;
        }
    }

    increaseEnemiesSpeed() {
        this.score += 1;
        for (let i = 0; i < this.enemyPool.length; i += 1) {
            this.enemyPool[i].speed += 0.05;
        }
    }
}
