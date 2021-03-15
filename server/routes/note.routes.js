const { checkAuth } = require("../middlewares/auth.middlewares");
const noteController = require("../controllers/note.controller");
const router = require("express").Router();

router.get("/", checkAuth, noteController.getAllNote);
router.post("/", checkAuth, noteController.addNote);
router.patch("/:id", checkAuth, noteController.updateNote);
router.delete("/:id", checkAuth, noteController.deleteNote);

module.exports = router;
