const multer = require('multer');                             // Package permettant de gérer les fichiers entrants

const MIME_TYPES = {                                          // index des diffenrentes extention géré
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({                            // Indication pour l'enregistré sur le disque
  destination: (req, file, callback) => {                       // fonction qui explique ou enregistré les fichier
    callback(null, 'images');
  },
  filename: (req, file, callback) => {                          // création du nom du fichier
    const name = file.originalname.split(' ').join('_');        // Split le nom en plusieurs mots si possible et les regroupe avec des _
    const extension = MIME_TYPES[file.mimetype];                // utilise le mime type correspondant au minetype du fichier séléctionné
    callback(null, name + Date.now() + '.' + extension);        // création d'un nom de fichier classique
  }
});

module.exports = multer({storage: storage}).single('image');      // (juste un fichier) + export