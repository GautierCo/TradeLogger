const mongoose = require("mongoose");
const { isEmail } = require("validator");

/*
 Pour moi le profit, le % profit doit être calculer coté backend et stocker dans la db car plus tard pour faire les stats 
 cela pourra être utile
 Pareil pour le cacul de la sessionDuration
 Le status
 
*/

const tradeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    assets: {
        /* Trouver une liste de la totalité des assets ? */
        type: String,
        minlength: 1,
        maxlength: 10,
        required: false,
    },
    type: {
        type: String,
        required: true,
    },
    capital: {
        type: Number,
        required: true,
        trim: true,
    },
    fees: {
        type: Number,
        required: true,
        trim: true,
    },
    entryPrice: {
        type: Number,
        required: true,
        trim: true,
    },
    stopLoss: {
        type: Number,
        required: false,
        trim: true,
    },
    takeProfit: {
        type: Number,
        required: false,
        trim: true,
    },
    exitPrice: {
        type: Number,
        required: false,
        trim: true,
    },
    screenshotUrl: {
        type: String,
        required: false,
        trim: true,
    },
    riskRatio: {
        type: Number,
        required: false,
        trim: true,
    },
    entryDate: {
        type: Date,
        required: true,
    },
    exitDate: {
        type: Date,
        required: false,
    },
    sessionDuration: {
        type: String,
        required: false,
    },
    platform: {
        type: String,
        required: true,
    },
    leverage: {
        type: Number,
        required: false,
        default: 1,
        trim: true,
    },
    setup: {
        type: String,
        required: false,
    },
    feeling: {
        type: String,
        required: false,
    },
    note: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    pnl: {
        type: Number,
        required: false,
        trim: true,
    },
    pnlPer: {
        type: Number,
        required: false,
        trim: true,
    },
    platformLogo: {
        type: String,
        required: false,
    },
});

const TradeModel = mongoose.model("trades", tradeSchema);

module.exports = TradeModel;
