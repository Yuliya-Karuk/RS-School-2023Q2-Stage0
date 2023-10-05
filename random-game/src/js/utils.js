export { newUtils };

class Utils {
    // min and max included
    generateRandomPosition(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

const newUtils = new Utils();