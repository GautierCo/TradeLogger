const NoteModel = require("../models/note.model");
const UserModel = require("../models/user.model");

module.exports.getAllNote = async (req, res) => {
    const userId = req.user.id;

    try {
        const notesData = await UserModel.findById(userId).select("notes");

        // Use $in for find every ID in array
        await NoteModel.find(
            {
                _id: { $in: notesData.notes },
            },
            (err, docs) => {
                if (!err) return res.status(200).json({ notes: docs });
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Erreur lors de la recherche des notes de l'utilisateur" });
    }
};

module.exports.addNote = async (req, res) => {
    const note = req.body;
    const userId = req.user.id;

    try {
        await NoteModel.create(note).then(async (data) => {
            await UserModel.updateOne(
                { _id: userId },
                {
                    $addToSet: {
                        notes: data._id,
                    },
                },
                (err, doc) => {
                    if (!err) return res.status(201).json(data);
                }
            );
        });
    } catch (error) {
        res.status(500).json({ message: "Error when you try to add note", error });
    }
};

module.exports.updateNote = async (req, res) => {
    const updatedNote = req.body;
    const noteId = req.params.id;

    try {
        await NoteModel.updateOne(
            { _id: noteId },
            {
                $set: { ...updatedNote },
            },
            (err, doc) => {
                console.log(err, doc);
                if (!err) return res.status(200).json({ note: doc });
            }
        );
    } catch (error) {
        res.status(500).json({ message: "Error when you try to update note", error });
    }
};

module.exports.deleteNote = (req, res) => {
    const deleteId = req.params.id;

    try {
        NoteModel.deleteOne({ _id: deleteId }, (err) => {
            console.log(err);
            if (!err) return res.status(200).json({ message: "Note was been deleted" });
        });
    } catch (error) {
        res.status(500).json({ message: "Error when you try to delete note" + deleteId, error });
    }

    console.log(deleteId);
};
