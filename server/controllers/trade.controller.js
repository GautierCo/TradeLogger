const TradeModel = require("../models/trade.model");

module.exports.getAllTrades = async (req, res) => {
    return;
};

module.exports.getAllTradesByUserId = async (req, res) => {
    return;
};

module.exports.addTrade = async (req, res) => {
    const userId = req.params.userId;

    // Il faut ajouter l'userId avant l'envoie du nouveau trade

    try {
        const trade = await TradeModel.create(req.body);
        res.status(201).json({ tradeId: trade._id });
    } catch (error) {
        console.error("Adding new Trade error", error);
        res.status(200).send({ error });
    }
};

module.exports.updateTrade = async (req, res) => {
    return;
};

module.exports.deleteTrade = async (req, res) => {
    return;
};
