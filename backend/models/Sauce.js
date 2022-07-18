const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type: String},
    name: { type: String},
    manufacturer: { type: String},
    description: { type: String},
    mainPepper: { type: String},
    imageUrl: { type: String},
    heat:{ type: Number},
    //gestion des likes et dislikes
    likes:  { type: Number, 'default': 0 },
    dislikes: { type: Number, 'default': 0 },
    usersLiked: { type: Array, 'default': [] },
    usersDisliked: { type: Array, 'default': [] }
});
module.exports = mongoose.model('Sauce', sauceSchema);