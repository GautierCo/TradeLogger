import moment from "moment";
import duration from "moment-duration-format";
import _ from "lodash";

/* Color status in rows of trades */
export const statusColor = (status) => {
    if (status === "Win") return "#21ba45";
    else if (status === "Loss") return "#db2828";
    else if (status === "In progress") return "#767676";
};

/* Format timestamps for input type date */
export const formatTimestamps = (timestamps) => {
    const seconds = timestamps;
    const durationInSeconds = moment.duration(seconds, "seconds");
    const sessionDuration = durationInSeconds.format(duration, "dd:hh:mm:ss");
    return sessionDuration;
};

/* Format date to DD-MM-YYYY HH:mm */
export const formatDate = (date) => {
    return moment(date).format("DD-MM-YYYY HH:mm");
};

/* Calcul nbr of trade by type (ex: Long, Short, Global) */
export const calculNbrOfTrades = (trades, type) => {
    if (trades.length <= 0) return 0;
    else if (type !== "Global") {
        return trades.filter((trade) => trade.type === type && trade.status !== "In progress").length;
    } else {
        return trades.filter((trade) => trade.status !== "In progress").length;
    }
};

/* Calcul global profit of all trades */
export const calculTotalProfit = (trades) => {
    if (trades.length === 0) return 0;
    let totalProfit = [];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    trades.forEach((trade) => {
        if (trade.format === "BTC" && trade.priceBtcVsUsd) {
            totalProfit.push(parseFloat(Math.round(trade.priceBtcVsUsd * trade.pnl).toFixed(2)));
        } else {
            totalProfit.push(trade.pnl);
        }
    });

    return Math.round(totalProfit.reduce(reducer));
};

/* Calcul % of trades by type (ex: Long, Short, Global) */
export const calculPerProfit = (trades, type) => {
    if (trades.length === 0) return 0;

    const tradesWithoutInProgress = trades.filter((trade) => trade.status !== "In progress");

    if (tradesWithoutInProgress.length <= 0) {
        return 0;
    } else if (type !== "Global") {
        let winTrades = [];
        const tradesFiltered = tradesWithoutInProgress.filter(
            (trade) => trade.type === type && trade.status !== "In progress"
        );
        const totalTrades = tradesFiltered.length;

        if (!totalTrades) return 0;

        tradesFiltered.forEach((trade) => {
            if (trade.status === "Win") winTrades.push(trade);
        });

        return Math.round((winTrades.length / totalTrades) * 100);
    } else {
        const winTrades = tradesWithoutInProgress.filter((trade) => trade.status === "Win");

        return Math.round((winTrades.length / tradesWithoutInProgress.length) * 100);
    }
};

/* Color by number */
export const profitColor = (profit) => {
    if (profit === 0) return "white";
    else if (profit > 0) return "#21ba45";
    else return "rgb(219, 40, 40)";
};

/* 1234567 -> 1 234 567 */
export const formatNumber = (number) => {
    return Number(number.toFixed(1)).toLocaleString();
};

export const validateForm = (trade) => {
    const regAssets = "^([A-Z]{2,4})?(/)([A-Z]{2,4}$)";
    const regFloatNbr = /^[+-]?\d+(\.\d+)?$/;

    console.log("trade", trade);

    let errors = {};

    if (!trade.format) errors.format = "Requis";
    if (trade.format === "BTC" && !trade.priceBtcVsUsd) errors.priceBtcVsUsd = "Requis";
    if (!trade.platform) errors.platform = "Requis";
    if (!trade.type) errors.type = "Requis";
    if (!trade.capital) errors.capital = "Requis";
    if (!trade.assets) errors.assets = "Requis";
    if (!trade.entryPrice) errors.entryPrice = "Requis";
    if (!trade.fees) errors.entryPrice = "Requis";

    if (trade.assets !== "" && !trade.assets.match(regAssets)) errors.assets = "Format incorrect"; //  -> BTC/USD
    if (trade.capital !== "" && String(!trade.capital).match(regFloatNbr)) errors.capital = "Format incorrect";
    if (trade.entryPrice !== "" && String(!trade.entryPrice).match(regFloatNbr)) errors.entryPrice = "Format incorrect";

    if (trade.priceBtcVsUsd !== "" && String(!trade.priceBtcVsUsd).match(regFloatNbr))
        errors.priceBtcVsUsd = "Format incorrect";
    if (trade.stopLoss !== "" && String(!trade.stopLoss).match(regFloatNbr)) errors.stopLoss = "Format incorrect";
    if (trade.takeProfit !== "" && String(!trade.takeProfit).match(regFloatNbr)) errors.takeProfit = "Format incorrect";
    if (trade.exitPrice !== "" && String(!trade.exitPrice).match(regFloatNbr)) errors.exitPrice = "Format incorrect";
    if (trade.riskRatio !== "" && String(!trade.riskRatio).match(regFloatNbr)) errors.riskRatio = "Format incorrect";
    if (trade.fees !== "" && String(!trade.fees).match(regFloatNbr)) errors.fees = "Format incorrect";

    return _.isEmpty(errors) ? null : errors;
};
