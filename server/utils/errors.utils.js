module.exports.signupErrors = (err) => {
    let errors = { pseudo: "", email: "", password: "" };

    if (err.message.includes("pseudo")) errors.pseudo = "Votre pseudo est invalide";

    if (err.message.includes("email")) errors.email = "Votre email est invalide";

    if (err.message.includes("password")) errors.password = "Le mot de passe doit faire au moins 6 caractères";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
        errors.pseudo = "Votre pseudo est déjà utilisé";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
        errors.email = "Votre email est déjà utilisé";

    return errors;
};
