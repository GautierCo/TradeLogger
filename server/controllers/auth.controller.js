const UserModel = require("../models/user.model");
const { signupErrors } = require("../utils/errors.utils");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 21 * 60 * 60 * 1000; // 1 jour

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_TOKEN, {
        expiresIn: maxAge,
    });
};

// Signup
module.exports.signUp = async (req, res) => {
    const { pseudo, email, password } = req.body;
    try {
        const user = await UserModel.create({ pseudo, email, password });
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = signupErrors(err);
        console.error("Signup error", err);
        res.status(200).send({ errors });
    }
};

// Login with JWT
module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.setHeader("Authorization", token);
        //res.cookie("jwt", token, { httpOnly: true, maxAge });
        res.status(200).json({ id: user._id, token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Connexion impossible", error });
    }
};

// Logout
module.exports.logout = async (req, res) => {
    res.setHeader("Authorization", "");
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
};

// Ressources intéressante sur JWT, il est préfèrable d'utililiser les headers couplé avec le local storage plutôt que les cookies
// Pour ce protéger des deux types d'attaques :  CSRF & XSS
// Source : https://www.youtube.com/watch?t=2100&v=67mezK3NzpU
