const router = require("express").Router();
const tradeController = require("../controllers/trade.controller");
const { checkAuth } = require("../middlewares/auth.middlewares");

router.get("/", checkAuth, tradeController.getAllTrades);
router.get("/:id", checkAuth, tradeController.getAllTradesByUserId);
router.post("/:userId", checkAuth, tradeController.addTrade);
router.put("/:id", checkAuth, tradeController.updateTrade);
router.delete("/:id", checkAuth, tradeController.deleteTrade);

module.exports = router;
