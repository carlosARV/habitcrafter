// Import the Router module from Express
const { Router } = require("express");
// Create a new router instance
const router = Router();

const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditForm,
  updateNote,
  deleteNote,
  handleSubscription
} = require("../controllers/notes.controller");

const { isAuthenticated } = require("../helpers/auth");

// Manejar las solicitudes POST a '/subscription'
router.post("/subscription", handleSubscription);

// New note
router.get("/notes/add", isAuthenticated, renderNoteForm);
router.post("/notes/new-note", isAuthenticated, createNewNote);

// Get all notes
router.get("/notes", isAuthenticated, renderNotes);

// Update notes
router.get("/notes/edit/:id", isAuthenticated, renderEditForm);
router.put("/notes/edit/:id", isAuthenticated, updateNote);

// Delete notes
router.delete("/notes/delete/:id", isAuthenticated, deleteNote);

module.exports = router;
