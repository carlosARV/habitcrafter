const {Router} = require('express');

const router = Router();

const { 
    renderRoutineForm, 
    createNewRoutine, 
    renderRoutines, 
    renderEditForm, 
    updateRoutine, 
    deleteRoutine
} = require('../controllers/routines.controller');

const {isAuthenticated} = require('../helpers/auth');

// New note
router.get('/routines/add', isAuthenticated, renderRoutineForm);
router.post('/routines/new-routine', isAuthenticated, createNewRoutine);

// Get all notes
router.get('/routines', isAuthenticated, renderRoutines);

// Update notes
router.get('/routines/edit/:id', isAuthenticated, renderEditForm);
router.put('/routines/edit/:id', isAuthenticated, updateRoutine);

// Delete notes
router.delete('/routines/delete/:id', isAuthenticated, deleteRoutine);

module.exports = router;