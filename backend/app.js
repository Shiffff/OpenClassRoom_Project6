const express = require('express'); // Importation 'express' pour crée l'app

const app = express(); //constante pour appeler 'express'

const mongoose = require('mongoose'); //package qui facilite les interactions avec notre base de données MongoDB

const stuffRoutes = require('./routes/stuff');  // importation des routes stuff

const userRoutes = require('./routes/user');     // importation des routes users

const path = require('path');

var cors = require('cors')



mongoose.connect('mongodb+srv://shiffff:TtGWLWenXvOCJkOJ@project6.xmioux6.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


  app.use(cors());
  
  app.use(express.json());        // Recevoir les réponse json

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', stuffRoutes); //  importation des routeurs
app.use('/api/auth', userRoutes);   // 



module.exports = app;
