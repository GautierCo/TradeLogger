const ObjectID = require("mongoose").Types.ObjectId; // Permet de vérifier l'ID

module.exports.checkId = (id) => {
    if (!ObjectID.isValid(id)) return true;
};

// JWT :
/*
    Fournis des tokens sécurisés par une clé de hashage qu'on lui fournis, grâce à cette clé de hashage 
    cela nous permet d'authentifier l'utilisateur
    et de le faire naviguer sur l'applciation en sécurité. Pour vérifier son identité
*/
