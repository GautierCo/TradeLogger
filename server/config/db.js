// Mongodb config
const mongoose = require("mongoose");

mongoose
    .connect(`mongodb+srv://${process.env.NODE_ENV === "DEV" ? process.env.MONGO_DEV : process.env.MONGO_PROD}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("Database connected to MongoDB");
    })
    .catch((e) => {
        console.log("Failed to connected to MongoDB", e);
    });
