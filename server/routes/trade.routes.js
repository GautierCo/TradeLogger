const router = require("express").Router();
const tradeController = require("../controllers/trade.controller");

router.get("/", tradeController.getAllTrades);
router.get("/:id", tradeController.getAllTradesByUserId);
router.post("/:userId", tradeController.addTrade);
router.put("/:id", tradeController.updateTrade);
router.delete("/:id", tradeController.deleteTrade);

module.exports = router;
