
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },

    content: {
        type: String,
        default: ""
    },

    color: {
        type: String,
        default: "#ffffff"
    },

    pinned: {
        type: Boolean,
        default: false
    },

    archived: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
