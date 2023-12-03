const notesCtrl = {};
const Note = require("../models/Note");

const webpush = require('../webpush');

let subscriptionFromClient = null;

// Endpoint para recibir la suscripción del cliente y guardarla en el servidor
notesCtrl.handleSubscription = async (req, res) => {
  const { subscription } = req.body;

  if (subscription) {
    // Aquí la suscripción está presente, ahora puedes trabajar con ella
    console.log('Suscripción recibida:', subscription);

    subscriptionFromClient = subscription;

    // Devuelve una respuesta al cliente para confirmar la recepción exitosa
    return res.status(200).json({ message: 'Suscripción recibida correctamente' });
  } else {
    // Si la suscripción no está presente en la solicitud
    return res.status(400).json({ error: 'No se encontró la suscripción' });
  }
};

notesCtrl.renderNoteForm = (req, res) => {
  res.render("notes/new-note");
};

notesCtrl.createNewNote = async (req, res) => {
  const { title, description } = req.body;
  const newNote = new Note({ title, description });
  newNote.user = req.user.id;
  await newNote.save();

  if (subscriptionFromClient) {
    const payload = JSON.stringify({
      title: 'Habit Crafter',
      message: newNote.title,
    });

    try {
      await webpush.sendNotification(subscriptionFromClient, payload);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  req.flash("success_msg", "Note saved successfully");
  res.redirect("/notes");
};

notesCtrl.renderNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).sort({
    createdAt: "desc",
  });
  res.render("notes/all-notes", { notes });
};

notesCtrl.renderEditForm = async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id);
  if (note.user != req.user.id) {
    req.flash("error_msg", "Not authorized");
    return res.redirect("/notes");
  }
  res.render("notes/edit-note", { note });
};

notesCtrl.updateNote = async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "Note updated successfully");
  res.redirect("/notes");
};

notesCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Note deleted successfully");
  res.redirect("/notes");
};

module.exports = notesCtrl;