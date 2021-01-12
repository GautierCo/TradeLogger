require("dotenv").config();
require("./config/db");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const tradeRoutes = require("./routes/trade.routes");

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/trade", tradeRoutes);

// Server
app.listen(process.env.PORT, () => console.log(`Server started at port ${process.env.PORT}`));
