const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.udapteUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
