const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        feeling: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            // Auto
        },
    },
    {
        timestamps: true,
    }
);

const NoteModel = mongoose.model("notes", noteSchema);

module.exports = NoteModel;
