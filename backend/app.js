const express = require('express'); // Importation 'express' pour crée l'app

const app = express(); //constante pour appeler 'express'

const mongoose = require('mongoose'); //package qui facilite les interactions avec notre base de données MongoDB

const stuffRoutes = require('./routes/stuff');  // importation des routes stuff

const userRoutes = require('./routes/user');     // importation des routes users

const path = require('path');       // gére les chemins d'accées au fichier

var cors = require('cors')      //Gere le pb de cors (ystème de sécurité qui, par défaut, bloque les appels HTTP entre des serveurs différents)

require('dotenv').config();



mongoose.connect(`mongodb+srv://${process.env.id}:${process.env.password}@project6.xmioux6.mongodb.net/?retryWrites=true&w=majority`,      // connection a la base de données
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


  app.use(cors());                                        //Gere le pb de cors (ystème de sécurité qui, par défaut, bloque les appels HTTP entre des serveurs différents)
  
  app.use(express.json());        // Recevoir les réponse json

app.use('/images', express.static(path.join(__dirname, 'images')));       // route static pour les images DL
app.use('/api/sauces', stuffRoutes); //  importation des routeurs
app.use('/api/auth', userRoutes);   // 



module.exports = app;
