const TradeModel = require("../models/trade.model");
const UserModel = require("../models/user.model");
const { checkId } = require("../utils/utils");

module.exports.getAllTrades = async (req, res) => {
    return;
};

module.exports.getAllTradesByUserId = async (req, res) => {
    return;
};

module.exports.addTrade = async (req, res) => {
    const userId = res.locals.user._id;
    //const userId = req.params.userId;
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
