const TradeModel = require("../models/trade.model");
const UserModel = require("../models/user.model");
const { checkId, calculProfit, calculProfitPer, knowStatus, calculSessionDuration } = require("../utils/utils");

module.exports.getTradeById = async (req, res) => {
    const userId = req.user.id;
    const tradeId = req.params.id;

    if (!req.params.id) return res.status(400).json({ message: "Vous devez préciser l'ID du trade en paramètre" });

    try {
        await TradeModel.findById(tradeId, (err, doc) => {
            if (err) return res.status(400).json({ message: err });
            if (doc.userId !== userId)
                return res.status(403).json({ message: "Vous n'êtes pas le propriétaire de ce trade." });
            else return res.status(201).json({ trade: doc });
        });
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la recherche des trades de l'utilisateur" });
    }
};

module.exports.getAllTradesByUserId = async (req, res) => {
    //if (userId !== req.user.id) return res.status(403).json({ message: "Vous ne pouvez pas accèder à ce contenu" });
    const userId = req.user.id;

    try {
        const tradesId = await UserModel.findById(userId).select("trades");

        if (tradesId.trades.length === 0) return res.status(201).json({ trades: [] });

        await TradeModel.find(
            {
                _id: { $in: tradesId.trades },
            },
            (err, docs) => {
                if (!err) return res.status(200).json({ trades: docs });
            }
        );
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la recherche des trades de l'utilisateur" });
    }
};

module.exports.addTrade = async (req, res) => {
    if (checkId(req.user.id)) return res.status(400).send(`Unknow ID ${req.user.id}.`);

    console.log("req.body", req.body);

    const userId = req.user.id;
    const tradeData = req.body;
    let tradeFinalData = {};

    if (tradeData.exitPrice) {
        if (
            isNaN(tradeData.entryPrice) ||
            isNaN(tradeData.exitPrice) ||
            isNaN(tradeData.leverage) ||
            isNaN(tradeData.capital) ||
            isNaN(tradeData.fees)
        )
            return res.status(400).json({
                message: `L'une des variables suivante n'est pas un nombre: entryPrice, exitPrice, leverage, capital, fees`,
            });

        const profit = calculProfit(tradeData);
        const profitPer = calculProfitPer(profit, tradeData.capital);
        const status = knowStatus(profit);
        const sessionDuration = calculSessionDuration(tradeData.entryDate, tradeData.exitDate);

        tradeFinalData = {
            ...tradeData,
            pnl: profit,
            pnlPer: profitPer,
            status: status,
            sessionDuration: sessionDuration,
        };
    } else {
        tradeFinalData = {
            ...tradeData,
            pnl: 0,
            pnlPer: 0,
            status: "In progress",
            sessionDuration: "In progress",
        };
    }

    try {
        await TradeModel.create(tradeFinalData).then(async (data) => {
            await UserModel.updateOne(
                { _id: userId },
                {
                    $addToSet: {
                        trades: data._id,
                    },
                },
                { new: true, upsert: true }
            );
            res.status(201).json({ ...tradeFinalData, _id: data._id });
        });
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
