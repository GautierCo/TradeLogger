// Ce model sers a déclarer à quoi va ressembler notre base de donnée, quels sont les caractères obligatoires etc.

const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 25,
            unique: true,
            trim: true, // Supprime les espaces
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [isEmail],
            lowercase: true,
        },
        avatar: {
            type: String,
            default: "./profil/random-user.png",
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            max: 1024,
        },
        trades: {
            type: [String], // Un tableau avec une série d'ID de chaque trade associé à l'utilisateur
        },
    },
    {
        timestamps: true,
    }
);

// On encrypte le mot de passe avec Bcrypt
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
