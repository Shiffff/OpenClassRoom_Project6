const jwt = require('jsonwebtoken'); // importation plugin token

module.exports = (req, res, next) => {          
    try {
        const token = req.headers.authorization.split(' ')[1];  // récupération de la ligne authorization du header puis split grace a l'espace entre les deux mots [1] car suppresion du premier mot
        const decodedToken = jwt.verify(token, 'TJHQK4FTHDV4VD9C'); // décodage du token grace a la clé préalablement créer
        const userId = decodedToken.userId; // Récuparation de la valeur userId qui était codé dans le token
        req.auth = {
            userId: userId
        };
        next();
    } catch(error) {
        res.status(401).json({ error });
    }
};


// Cette fonction extrait donc la valeur userId présente dans le token, afin d'authentifié differente request