const express = require('express');

const router = express.Router();
const {getAllNotes,getNoteById,createNote,updateNote, deleteNote} = require('../controllers/noteControllers');

router.get('/', getAllNotes);

router.post('/', createNote);

router.put('/:id',updateNote);

router.delete('/:id',deleteNote);

router.get('/:id',getNoteById);
// GET all notes
// router.get('/', (req, res) => {
//     res.json({
//         message: "All Notes"
//     });
// });

// GET a single note
// router.get('/:id', (req, res) => {
//     res.json({
//         message: "Single Note",
//         id: req.params.id
//     });
// });

// CREATE a note
// router.post('/', (req, res) => {
//     res.json({
//         message: "Create Note"
//     });
// });

// UPDATE a note
// router.put('/:id', (req, res) => {
//     res.json({
//         message: "Update Note",
//         id: req.params.id
//     });
// });

// DELETE a note
// router.delete('/:id', (req, res) => {
//     res.json({
//         message: "Delete Note",
//         id: req.params.id
//     });
// });

module.exports = router;