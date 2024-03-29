const UserModel = require("../models/user.model");
const { signupErrors } = require("../utils/errors.utils");
const jwt = require("jsonwebtoken");

// Refresh accessToken
module.exports.refresh = async (req, res) => {
    const { refreshToken, id } = req.body; // Le client nous envoie le refreshToken et l'ID de l'utilisateur
    console.log("Refresh Access Token", id);
    const refreshTokenIsEqual = await UserModel.findById(id, (err, doc) => {
        if (err) {
            console.log(err);
            return false;
        } else {
            if (refreshToken === doc.refreshToken) return true;
            else return false;
        }
    });

    if (!refreshToken || !refreshTokenIsEqual)
        return res.status(403).json({
            message: "Refresh token not found, login again",
            id: "",
            accessToken: "",
            refreshToken: "",
            connected: false,
        });

    // Si le refreshToken est valide, on créer un nouveau accessToken
    jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_TOKEN, async (err, user) => {
        if (!err) {
            const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_TOKEN, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });

            // Update de l'accessToken de l'utilisateur dans la db
            await UserModel.updateOne(
                { _id: user.id },
                {
                    $set: {
                        accessToken: accessToken,
                    },
                },
                { new: true },
                (err, docs) => {
                    if (err)
                        return res.status(403).json({ id: "", accessToken: "", refreshToken: "", connected: false });
                }
            );

            return res.json({ success: true, accessToken, id: user.id, connected: true });
        } else {
            return res.json({
                success: false,
                message: "Invalid refresh token",
            });
        }
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

        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_TOKEN, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_REFRESH_TOKEN);

        await UserModel.updateOne(
            { _id: user._id },
            {
                $set: {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                },
            },
            (err, docs) => {
                if (err) return res.status(403).json({ id: "", accessToken: "", refreshToken: "", connected: false });
            }
        );

        // res.setHeader("Authorization", accessToken); // Utile ?
        res.status(201).json({
            id: user._id,
            accessToken: accessToken,
            refreshToken: refreshToken,
            pseudo: user.pseudo,
            connected: true,
        });

        console.log("Client connected " + user._id);
    } catch (error) {
        console.log(error);
        res.status(200).json({ message: "Email ou mot de passe incorrect", error });
    }
};

// Logout
module.exports.logout = async (req, res) => {
    try {
        await UserModel.updateOne(
            { _id: req.user.id },
            {
                $set: {
                    accessToken: "",
                    refreshToken: "",
                },
            },
            { new: true, multi: true },
            (err, docs) => {
                if (err) return res.status(500).json({ message: "Erreur lors de la déconnexion " });
                else {
                    console.log("Client disconnected " + req.user.id);
                    res.setHeader("Authorization", "");
                    res.status(200).json({ id: "", accessToken: "", refreshToken: "", connected: false });
                }
            }
        );
    } catch (error) {
        res.status(500).json(error);
    }
};
