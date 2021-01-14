const jwt = require("jsonwebtoken");

// On vérifie si l'utilisateur qui effectue la requête est bien authentifié avec un jeton valide
module.exports.checkAuth = async (req, res, next) => {
    //let accessToken = req.headers["Authorization"];
    let accessToken = req.headers.authorization;
    accessToken = accessToken.split("Bearer ")[1];

    jwt.verify(accessToken, process.env.JWT_SECRET_TOKEN, async (err, user) => {
        if (user) {
            req.user = user;
            next();
        } else {
            console.log(err);
            return res.status(403).json({ err, message: "User not authenticated" });
        }
    });
};
