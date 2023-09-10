export { newUtils };

class Utils {
    generateCardNumber() {
        const number = Math.floor(Math.random() * (68719476736 - 4294967296) + 4294967296);
        const hexNumber = number.toString(16).toUpperCase();
        return hexNumber;
    }

    capitalizeFirstChar(str) {
        if (!str) return str;
        return str[0].toUpperCase() + str.slice(1);
    }
}

const newUtils = new Utils();