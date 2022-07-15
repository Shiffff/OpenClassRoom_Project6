const mongoose = require('mongoose');   // Appel de mongoose pour crée un nouveau schema (schema email + password)
const uniqueValidator = require('mongoose-unique-validator');   // Appel de mongoose-unique-validator pour certifié que deux même adresse email ne puisse pas etre enregistré


const userSchema = mongoose.Schema({            // Nouveau schema email + password require et  unique pour l'addresse email
    email: { type: String, require:true, unique: true },
    password: { type: String, require: true }
});


userSchema.plugin(uniqueValidator);


module.exports = mongoose.model('User, userSchema');            // On exporte ce nouveaux schema en tant que model