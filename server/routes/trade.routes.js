const router = require("express").Router();
const tradeController = require("../controllers/trade.controller");
const { checkUserToken } = require("../middlewares/auth.middlewares");

router.get("/", checkUserToken, tradeController.getAllTrades);
router.get("/:id", checkUserToken, tradeController.getAllTradesByUserId);
router.post("/:userId", checkUserToken, tradeController.addTrade);
router.put("/:id", checkUserToken, tradeController.updateTrade);
router.delete("/:id", checkUserToken, tradeController.deleteTrade);

module.exports = router;
