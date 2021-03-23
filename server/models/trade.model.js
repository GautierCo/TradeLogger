const mongoose = require("mongoose");
const regAssets = "^([A-Z]{2,4})?(/)([A-Z]{2,4}$)";
const regFloatNbr = /^[+-]?\d+(\.\d+)?$/;

const tradeSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        assets: {
            type: String,
            maxlength: 10,
            required: false,
            //validate: [equals()]
            //match: ["^([A-Z]{2,4})?(/)([A-Z]{2,4}$)", "Regex fail"],
        },
        type: {
            type: String,
            required: true,
        },
        format: {
            type: String,
            required: true,
        },
        priceBtcVsUsd: {
            type: Number,
            match: [regFloatNbr, "Regex fail"],
        },
        capital: {
            type: Number,
            required: true,
            trim: true,
            match: [regFloatNbr, "Regex fail"],
        },
        fees: {
            type: Number,
            required: true,
            trim: true,
            match: [regFloatNbr, "Regex fail"],
        },
        entryPrice: {
            type: Number,
            required: true,
            trim: true,
            match: [regFloatNbr, "Regex fail"],
        },
        stopLoss: {
            type: Number,
            required: false,
            trim: true,
            match: [regFloatNbr, "Regex fail"],
        },
        takeProfit: {
            type: Number,
            required: false,
            trim: true,
            match: [regFloatNbr, "Regex fail"],
        },
        exitPrice: {
            type: Number,
            required: false,
            trim: true,
            match: [regFloatNbr, "Regex fail"],
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
            match: [regFloatNbr, "Regex fail"],
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
            match: [regFloatNbr, "Regex fail"],
        },
        pnlPer: {
            type: Number,
            required: false,
            trim: true,
            match: [regFloatNbr, "Regex fail"],
        },
        platformLogo: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const TradeModel = mongoose.model("trades", tradeSchema);

module.exports = TradeModel;
