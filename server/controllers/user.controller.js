const UserModel = require("../models/user.model");
const { checkId } = require("../utils/utils");

// https://www.youtube.com/watch?v=SUPDFHuvhRc&list=PLEiMYEzpB4QsZIxBeWo9T1fCnii0XHfHP
// 1h32
// selected("-password") => n'inclus pas le password dans la response

// Get all users
module.exports.getAllUsers = async (_, res) => {
    console.log("getAll");
    try {
        const users = await UserModel.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(200).json(error);
    }
};

// Get one user by ID
module.exports.getUserById = async (req, res) => {
    const userId = req.params.id;
    if (checkId(userId)) return res.status(400).send(`Unknow ID ${userId}.`);

    try {
        UserModel.findById(userId, (err, docs) => {
            if (!err) res.json(docs);
            else res.status(400).send(`Unknow ID ${userId}`);
        }).select("-password");
    } catch (error) {
        res.status(200).json(error);
    }
};

// Update one user by ID
module.exports.udapteUser = async (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    if (checkId(userId)) return res.status(400).send(`Unknow ID ${userId}.`);

    //if (!userId) return res.status(500).send("For udpate an user, you need to provide an ID");

    try {
        await UserModel.updateOne(
            { _id: userId },
            {
                $set: {
                    pseudo: userData.pseudo,
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.status(201).json(docs);
            }
        );
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    if (checkId(userId)) return res.status(400).send(`Unknow ID ${userId}.`);

    try {
        await UserModel.deleteOne({ _id: userId }).exec();
        res.status(200).json({ message: `User ${userId} successfully deleted` });
    } catch (error) {
        res.status(500).json(error);
    }
};
