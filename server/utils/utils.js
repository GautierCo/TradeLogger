const ObjectID = require("mongoose").Types.ObjectId; // Permet de vérifier l'ID

module.exports.checkId = (id, res) => {
    if (!ObjectID.isValid(id)) return res.status(400).send(`Unknow ID ${id}.`);
};
