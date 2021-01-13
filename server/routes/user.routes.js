const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { checkUserToken } = require("../middlewares/auth.middlewares");

router.get("/", checkUserToken, userController.getAllUsers);
router.get("/:id", checkUserToken, userController.getUserById);
router.put("/:id", checkUserToken, userController.udapteUser);
router.delete("/:id", checkUserToken, userController.deleteUser);

module.exports = router;
