const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { checkAuth } = require("../middlewares/auth.middlewares");

router.get("/", checkAuth, userController.getAllUsers);
router.get("/:id", checkAuth, userController.getUserById);
router.put("/:id", checkAuth, userController.udapteUser);
router.delete("/:id", checkAuth, userController.deleteUser);

module.exports = router;
