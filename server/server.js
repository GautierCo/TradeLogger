require("dotenv").config();
require("./config/db");
const helmet = require("helmet");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Routers
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const tradeRoutes = require("./routes/trade.routes");
const noteRoutes = require("./routes/note.routes");

// Middlewares
app.use(
    cors({
        origin: process.env.NODE_ENV === "DEV" ? process.env.CLIENT_DEV_URL : process.env.CLIENT_PROD_URL,
        credentials: true,
    })
);

app.use(helmet());
app.disable("x-powered-by");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/trade", tradeRoutes);
app.use("/api/note", noteRoutes);

// Server
app.listen(process.env.PORT, () => console.log(`Server started at port ${process.env.PORT}`));
