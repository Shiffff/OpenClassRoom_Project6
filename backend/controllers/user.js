const User = require('../models/User');         // importation du model (email + password)
const bcrypt = require('bcrypt');               // Utilisation du plugin bcrypt
const jwt = require('jsonwebtoken');            // Importation du plugin de génération token        


exports.signup = (req, res, next) => {      // logique de la route signup avant exportation dans le routeur
    bcrypt.hash(req.body.password, 10)      // utilisation du plugin bcrypt (créer un hash du password (utilisation de l'algo 15 fois = salage du mot de passe))
    .then(hash => {                         // recupération du hash pour :
        const user = new User({             // nouvelle instance du schema user
            email: req.body.email,          // séléction du champ "email" dans le body de la requete
            password: hash                  // Séléction du hash ( le password n'est pas stocké)
        });
        user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))        // Status 201 = création de ressource
            .catch(error => res.status(400).json({ error }));
    })                                      
    .catch(error => res.status(500).json({ error }));       // si err
};


exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email}) //User findOne permet de ne séléctionner qu'un élément du schema présent dans mongo atlas et req body email séléctionne les données  du champ saisie
    .then(user => {                        // Si 'user' appeler et retrouver dans la base de donnée
        if (user === null) {            
            res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte'});   
        }else{                              // sinon(l'utilisateur existe dans la base de donnée donc:)
            bcrypt.compare(req.body.password, user.password)    // Comme le mot de passe n'est pas enregistré (uniquement le hash et que l'on utilise un algorytme non réversible )
            .then(valid => {
                if (!valid){                                    // Si la réponse n'est pas valid (les deux hashs ne correspondent pas)
                    res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte'})
                }else{                                          // Si les hash correspondent
                    res.status(200).json({                          // Si valid :
                        userId: user._id,                           // renvoie le user id généré par mongoDB + un token
                        token: jwt.sign(                            //  création du TOKEN
                            { userId: user._id },                   // premier argument séléction de la chose a encodé ici l'id généré par mongo DB cela permet de fixer des droits par rapport a un utilisateur
                            'RANDOM_TOKEN_SECRET',         // clé secrete pour l'encodage
                            { expiresIn: '24h' }                    // expiration en 24h
                        )
                    });
                }
            })                                             // Nous devons comparer les deux hash pour valider l'authentification
            .catch(error => res.status(500).json({ error }));
        }
    })
    .catch(error => res.status(500).json({ error }));

};