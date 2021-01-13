const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

module.exports.checkUserToken = (req, res, next) => {
    console.log("checkUserToken");
    // const token = req.cookies.jwt; // On récupere le token stocké dans les cookies
    console.log(req.headers.authorization);

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split("Bearer ")[1];
    } else {
        return res.status(403).json({ error: "Unauthorized access, need a valid token" });
    }

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_TOKEN, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.setHeader("Authorization", "");
                console.log("Erreur lors de la vérification du token");
                return res.status(401).json("Your token is invalid");
            } else {
                const user = await UserModel.findById(decodedToken.id).select("-password"); // decodedToken = ID de l'utilisateur { id: '5ffcffbbfbc307273c2f78dd', iat: 1610500363, exp: 1837300363 }
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        res.status(401).json({ message: "You don't have a token access" });
    }
};

/*
 Pour l'instant pas certain d'une chose :
 Est ce que j'ai besoin de vérifier si le token appartient bien à l'utilisateur

 par exemple vérifier si l'utilisateur qui envoie la requête pour modifier un trade grâce à son ID, 
 est ce que son token JWT.id === 


 Cookie ou Headers ? A voir... Les headers on peut récuperer le jeton avec un une attaque via javascript
*/

/*
??

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_TOKEN, async (err, decodedToken) => {
            if (err) {
                //throw Error("Erreur lors de la vérification du token", err);
                console.log(err);
            } else {
                console.log(decodedToken.id);
                next();
            }
        });
    } else {
        console.log("Pas de token");
    }
};
*/
