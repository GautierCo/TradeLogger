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
