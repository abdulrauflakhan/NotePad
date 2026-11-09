const Note = require('../models/Note');
const getAllNotes = async (req, res) => {
    try {

        const notes = await Note.find();

        res.status(200).json({
            success: true,
            notes
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// GET NOTE BY ID
const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            note
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const createNote = async (req, res) => {

    try {

        const { title, content } = req.body;

        const newNote = await Note.create({
            title,
            content
        });

        res.status(201).json({
            success: true,
            message: "Note created successfully",
            note: newNote
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
// UPDATE NOTE
const updateNote = async (req, res) => {
    try {
        const { title, content, color, pinned, archived } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {
                title,
                content,
                color,
                pinned,
                archived
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            note: updatedNote
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// DELETE NOTE
const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(
            req.params.id
        );

        if (!deletedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Note deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
module.exports = {
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
};
