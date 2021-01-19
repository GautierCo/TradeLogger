const moment = require("moment");
const duration = require("moment-duration-format");
const ObjectID = require("mongoose").Types.ObjectId; // Permet de vérifier l'ID

module.exports.checkId = (id) => {
    if (!ObjectID.isValid(id)) return true;
};

module.exports.calculProfit = (trade) => {
    const { type, entryPrice, exitPrice, leverage, capital, fees = 0, format } = trade;

    if (format === "BTC") {
        if (type === "Long") {
            const result = parseFloat(Number((exitPrice / entryPrice - 1) * leverage * capital).toFixed(8), 10);
            return result;
        }

        if (type === "Short") {
            const result = parseFloat(Number((1 - exitPrice / entryPrice) * leverage * capital).toFixed(8), 10);
            return result;
        }
    } else {
        if (type === "Long") {
            const result = parseFloat(Number((exitPrice / entryPrice - 1) * leverage * capital - fees).toFixed(2), 10);
            return result;
        }

        if (type === "Short") {
            const result = parseFloat(Number((1 - exitPrice / entryPrice) * leverage * capital - fees).toFixed(2), 10);
            return result;
        }
    }
};

module.exports.calculProfitPer = (profit, capital) => {
    const result = parseFloat(Number((profit / capital) * 100).toFixed(2), 10);
    return result;
};

module.exports.knowStatus = (profit) => {
    const nbrSign = Math.sign(profit);
    if (profit === 0) return "Even";
    if (nbrSign === 1 || nbrSign === 0) return "Win";
    if (nbrSign === -1 || nbrSign === -0) return "Loss";
};

module.exports.calculSessionDuration = (entryDate, exitDate) => {
    // On cherche a retourner le timestamp de la différence entre les dates
    const entry = moment(Date.parse(entryDate));
    const exit = moment(Date.parse(exitDate));
    const diff = exit.diff(entry, "LTS");
    const seconds = diff / 1000;
    return seconds;
};
