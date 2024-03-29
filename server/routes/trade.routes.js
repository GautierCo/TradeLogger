const router = require("express").Router();
const tradeController = require("../controllers/trade.controller");
const { checkAuth } = require("../middlewares/auth.middlewares");

router.get("/", checkAuth, tradeController.getAllTradesByUserId);
router.get("/:id", checkAuth, tradeController.getTradeById);
router.post("/", checkAuth, tradeController.addTrade);
router.patch("/:id", checkAuth, tradeController.updateTrade);
router.delete("/:id", checkAuth, tradeController.deleteTrade);

module.exports = router;
