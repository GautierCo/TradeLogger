const moment = require("moment");
const duration = require("moment-duration-format");
const ObjectID = require("mongoose").Types.ObjectId; // Permet de vérifier l'ID

module.exports.checkId = (id) => {
    if (!ObjectID.isValid(id)) return true;
};

module.exports.calculProfit = (trade) => {
    const { type, entryPrice, exitPrice, leverage, capital, fees = 0 } = trade;

    console.log(entryPrice, exitPrice, leverage, capital, fees);

    if (type === "Long") {
        const result = parseFloat(Number((exitPrice / entryPrice - 1) * leverage * capital - fees).toFixed(2), 10);
        console.log("calculProfit", result);
        return result;
    }

    if (type === "Short") {
        const result = parseFloat(Number((1 - exitPrice / entryPrice) * leverage * capital - fees).toFixed(2), 10);
        return result;
    }
};

module.exports.calculProfitPer = (profit, capital) => {
    const result = parseFloat(Number((profit / capital) * 100).toFixed(2), 10);
    console.log("calculProfitPer", result);
    return result;
};

module.exports.knowStatus = (profit) => {
    const nbrSign = Math.sign(profit);

    if (nbrSign === 1 || nbrSign === 0) return "W";
    if (nbrSign === -1 || nbrSign === -0) return "L";
};

module.exports.calculSessionDuration = (entryDate, exitDate) => {
    // On cherche a retourner le timestamp de la différence entre les dates
    const entry = moment(Date.parse(entryDate));
    const exit = moment(Date.parse(exitDate));
    const diff = exit.diff(entry, "LTS");
    const seconds = diff / 1000;
    return seconds;
};

// JWT :
/*
    Fournis des tokens sécurisés par une clé de hashage qu'on lui fournis, grâce à cette clé de hashage 
    cela nous permet d'authentifier l'utilisateur
    et de le faire naviguer sur l'applciation en sécurité. Pour vérifier son identité
*/
