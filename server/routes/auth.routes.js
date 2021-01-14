const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const { checkAuth } = require("../middlewares/auth.middlewares");

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.get("/logout", checkAuth, authController.logout);
router.post("/refresh", authController.refresh);

module.exports = router;
