const express = require("express");
const {
  addNote,
  getAll,
  getById,
  getByIdAndRemove,
  getByIdAndUpdate
} = require("../controllers/noteController");
const checkAuth = require("../middlewares/checkAuth");
const router = express.Router();

router.use(checkAuth)
router.get("/", getAll);

router.post("/", addNote);
router.get("/:id", getById);
router.delete("/:id", getByIdAndRemove);
router.put("/:id", getByIdAndUpdate);

module.exports = router;
