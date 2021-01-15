const TradeModel = require("../models/trade.model");
const UserModel = require("../models/user.model");
const { checkId } = require("../utils/utils");

module.exports.getAllTrades = async (req, res) => {
    return;
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
                if (!err) return res.status(201).json(docs);
            }
        );
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la recherche des trades de l'utilisateur" });
    }
};

module.exports.addTrade = async (req, res) => {
    const userId = req.user.id;

    if (checkId(userId)) return res.status(400).send(`Unknow ID ${userId}.`);

    try {
        await TradeModel.create(req.body).then(async (data) => {
            await UserModel.updateOne(
                { _id: userId },
                {
                    $addToSet: {
                        trades: data._id,
                    },
                },
                { new: true, upsert: true }
            );
            res.status(201).json({ tradeId: data._id });
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
