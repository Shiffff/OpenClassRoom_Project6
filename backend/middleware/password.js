const passwordValid = require('password-validator');

// creer un schema de validation
const passwordSchema = new passwordValid();
// propriétés du schema
passwordSchema
.is().min(8)        // minimum 8
.is().max(50)       // max 50
.has().digits(2)    // 2 chiffres mini
.has().not().spaces()   // pas d'espace

module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)){
        next();
    } else {
        return res.status(400).json({ error : "Le mot de passe est trop simple !" + passwordSchema.validate('req.body.password', {list: true})})
    }
}
