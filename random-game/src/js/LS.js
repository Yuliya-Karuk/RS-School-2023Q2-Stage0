export { newLocalStorageUtils };

class LocalStorageUtils {

    saveGameResult(value) {
        const games = localStorage.getItem('games');

        if (!games) {
            localStorage.setItem(`games`, JSON.stringify([value]));
        } else {
            const parsedGames = JSON.parse(games);
            parsedGames.push(value);
            parsedGames.sort((a, b) => b - a);

            if (parsedGames.length > 10) parsedGames.pop();

            localStorage.setItem('games', JSON.stringify(parsedGames));
        }
    }

    getResults() {
        const games = localStorage.getItem('games');
        return JSON.parse(games);
    }

    getBest() {
        const games = localStorage.getItem('games');
        return JSON.parse(games)[0];
    }
}

const newLocalStorageUtils =  new LocalStorageUtils();