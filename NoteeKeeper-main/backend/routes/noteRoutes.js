const express = require("express");
const {
  getNotes,
  createNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

// get all note route
router.route("/").get(protect, getNotes);

// create note route
router.route("/create").post(protect, createNotes);

// get node by id , update note , delete note
router
  .route("/:id")
  .get(getNoteById)
  .put(protect, updateNote)
  .delete(protect, deleteNote);

module.exports = router;
