const mongoose = require('mongoose');   

const sauceSchema = mongoose.Schema({              // création d'une nouvelle sauce avec des défault like + des tableau vide pour les futurs users qui aurait like ou deslike le produit                      
    userId: { type: String},
    name: { type: String},
    manufacturer: { type: String},
    description: { type: String},
    mainPepper: { type: String},
    imageUrl: { type: String},
    heat:{ type: Number},
    //gestion des likes et dislikes
    likes:  { type: Number, 'default': 0 },             // J'initialise les like dislike a 0
    dislikes: { type: Number, 'default': 0 },
    usersLiked: { type: Array, 'default': [] },         // Je crée un array vide dans le schema pour stocké les id des personne aillant like/dislike
    usersDisliked: { type: Array, 'default': [] }
});
module.exports = mongoose.model('Sauce', sauceSchema);