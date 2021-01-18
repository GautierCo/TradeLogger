import moment from "moment";
import duration from "moment-duration-format";

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
        totalProfit.push(trade.pnl);
    });

    return Math.round(totalProfit.reduce(reducer));
};

/* Calcul % of trades by type (ex: Long, Short, Global) */
export const calculPerProfit = (trades, type) => {
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