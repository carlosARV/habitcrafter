const routinesCtrl = {};
const Routine = require('../models/Routine');

routinesCtrl.renderRoutineForm = (req, res) => {
    res.render('routines/new-routine')
};

routinesCtrl.createNewRoutine = async (req, res) => {
    const { title, description, date, time} = req.body;
    const newRoutine = new Routine({title, description, date, time});
    newRoutine.user = req.user.id;
    await newRoutine.save();
    req.flash('success_msg', 'Routine saved successfully');

    res.redirect('/routines');
}

routinesCtrl.renderRoutines = async (req, res) => {
    const routines = await Routine.find({user: req.user.id}).sort({createdAt: 'desc'}).lean();
    res.render("routines/all-routines", { routines });
}

routinesCtrl.renderEditForm = async (req, res) => {
    const routine = await Routine.findById(req.params.id);
    if (routine.user != req.user.id) {
        req.flash('error_msg', 'Not authorized'); 
        return res.redirect('/routines'); 
    }
    res.render('routines/edit-routine', { routine });
}

routinesCtrl.updateRoutine = async (req, res) => {    
    const { title, description, date, time } = req.body; 

  try {
    const note = await Routine.findById(req.params.id);

    // Verifica si el documento existe
    if (!note) {
      req.flash("error_msg", "Note not found");
      return res.redirect("/routines");
    }
    // Verifica si el usuario tiene permiso para actualizar la nota
    if (note.user.toString() !== req.user.id) {
      req.flash("error_msg", "Not authorized");
      return res.redirect("/routines");
    }
    // Actualiza la nota si el usuario tiene permiso y el documento existe
    await Routine.findByIdAndUpdate(req.params.id, {title, description, date, time});
    req.flash("success_msg", "Routine updated successfully");
    res.redirect('/routines');
  } catch (error) {
    console.log(error);
    req.flash("error_msg", "Something went wrong");
    res.redirect('/routines');
  }
}

routinesCtrl.deleteRoutine = async (req, res) => {
    await Routine.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Routine deleted successfully');
    res.redirect('/routines');
}


module.exports = routinesCtrl;