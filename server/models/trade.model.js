const mongoose = require("mongoose");
const { isEmail } = require("validator");

const tradeSchema = new mongoose.Schema({
    // userId: {
    //     type: String,
    //     required: true,
    // },
    assets: {
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
        type: String,
        required: true,
        trim: true,
    },
    entryPrice: {
        type: String,
        required: true,
        trim: true,
    },
    stopLoss: {
        type: String,
        required: true,
        trim: true,
    },
    takeProfit: {
        type: String,
        required: true,
        trim: true,
    },
    leavingProfit: {
        type: String,
        required: false,
        trim: true,
    },
    screenshotUrl: {
        type: String,
        required: false,
        trim: true,
    },
    riskRatio: {
        type: String,
        required: true,
        trim: true,
    },
    entryDate: {
        type: Date,
        required: true,
    },
    exitDate: {
        type: Date,
        required: true,
    },
    sessionDuration: {
        type: Date,
        required: true,
    },
    platform: {
        type: String,
        required: true,
    },
    leverage: {
        type: Number,
        required: true,
        trim: true,
    },
    setup: {
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
        type: String,
        required: false,
        trim: true,
    },
    pnlPer: {
        type: String,
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

/*

    à gérer moi même coté back :
    status
    pnl
    pnlPer
    platformLogo
*/
