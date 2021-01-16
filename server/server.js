require("dotenv").config();
require("./config/db");

const moment = require("moment");
const duration = require("moment-duration-format");

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Routers
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const tradeRoutes = require("./routes/trade.routes");

const { calculProfit, calculProfitPer, knowStatus, calculSessionDuration } = require("./utils/utils");

// Middlewares
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
        //allowedHeaders: ["sessionId", "Content-Type", "Access-Control-Allow-Methods"],
        //exposedHeaders: ["sessionId"],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/* TEST Calculs */
const profit = calculProfit({ type: "Long", entryPrice: 1.5, exitPrice: 2.0, leverage: 1, capital: 100, fees: 10 });
const profitPer = calculProfitPer(profit, 100);
const status = knowStatus(profit);

//console.log(profit, profitPer, status);

/* TEST Dates 
const sessionDuration = calculSessionDuration(
    "Fri Jan 15 2021 22:00:00 GMT+0100 (heure normale d’Europe centrale)",
    "Fri Jan 22 2021 22:00:00 GMT+0100 (heure normale d’Europe centrale)"
);
*/

const seconds = "18260";
const durationInSeconds = moment.duration(seconds, "seconds");
const sessionDuration = durationInSeconds.format(duration, "dd:hh:mm:ss");

console.log(sessionDuration);
//console.log(sessionDuration);
/* */

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/trade", tradeRoutes);

// Server
app.listen(process.env.PORT, () => console.log(`Server started at port ${process.env.PORT}`));
