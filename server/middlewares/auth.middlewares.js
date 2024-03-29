const jwt = require("jsonwebtoken");

// On vérifie si l'utilisateur qui effectue la requête est bien authentifié avec un jeton valide
module.exports.checkAuth = async (req, res, next) => {
    let accessToken = req.headers.authorization;
    if (!accessToken) return res.status(403).json({ message: "You need a token to continue." });
    accessToken = accessToken.split("Bearer ")[1];

    jwt.verify(accessToken, process.env.JWT_SECRET_TOKEN, async (err, user) => {
        if (user) {
            console.log("Middleware checkAuth ", user);
            req.user = user;
            next();
        } else {
            console.log(err);
            return res.status(401).json({ err, message: "User not authenticated, you need a valid token" });
        }
    });
};
