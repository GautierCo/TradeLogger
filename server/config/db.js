// Mongodb connexion
const mongoose = require("mongoose");

mongoose
    .connect(process.env.NODE_ENV === "DEV" ? process.env.MONGO_DEV : `mongodb+srv://${process.env.MONGO_PROD}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log(
            process.env.NODE_ENV === "DEV"
                ? "Database connected to MongoDB LOCAL"
                : "Database connected to MongoDB CLUSTER"
        );
    })
    .catch((e) => {
        console.log("Failed to connected to MongoDB", e);
    });
