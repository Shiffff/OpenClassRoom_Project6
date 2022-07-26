const express = require('express'); // Importation 'express' pour crée l'app

const app = express(); //appel 'express'

const mongoose = require('mongoose'); //package qui facilite les interactions avec notre base de données MongoDB

const stuffRoutes = require('./routes/stuff');  // importation des routes stuff

const userRoutes = require('./routes/user');     // importation des routes users

const path = require('path');       // gére les chemins d'accées au fichier

var cors = require('cors')      //Gere le pb de cors (ystème de sécurité qui, par défaut, bloque les appels HTTP entre des serveurs différents)

const helmet = require('helmet') // définie et peu caché certaines information dans les en-têtes HTTP

const rateLimit = require('express-rate-limit');    //La limitation du débit empêche la même adresse IP de faire trop de demandes

const mongoSanitize = require('express-mongo-sanitize'); //fonction de nettoyage des entrées supprimera toutes les clés commençant par '$' 

require('dotenv').config();         // variable d'environement ( stockage local de mot de passe)



mongoose.connect(`mongodb+srv://${process.env.ID}:${process.env.PASSWORD}@${process.env.DB_NAME}.mongodb.net/?retryWrites=true&w=majority`,      // connection a la base de données
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100, // limite chaque IP à 100 requêtes par window de 15min
    standardHeaders: true, // retourne l'info de limite dans les headers
    legacyHeaders: false // désactive le 'X-rateLimit-*' headers
});

  app.use(cors());                                        //Gere le pb de cors (ystème de sécurité qui, par défaut, bloque les appels HTTP entre des serveurs différents)
  
  app.use(express.json());        // Recevoir les réponse json

app.use('/images', express.static(path.join(__dirname, 'images')));       // route static pour les images DL
app.use('/api/sauces', stuffRoutes); //  importation des routeurs
app.use('/api/auth', userRoutes);   // 
app.use(helmet());
app.use(mongoSanitize());

module.exports = app;
