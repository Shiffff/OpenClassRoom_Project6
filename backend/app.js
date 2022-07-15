const express = require('express'); // Importation 'express' pour crée l'app

const app = express(); //constante pour appeler 'express'

const mongoose = require('mongoose'); //package qui facilite les interactions avec notre base de données MongoDB

const stuffRoutes = require('./routes/stuff');


app.use(express.json());        // Recevoir les réponse json

mongoose.connect('mongodb+srv://shiffff:TtGWLWenXvOCJkOJ@project6.xmioux6.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {   // accépté compatibilité
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


  app.post('/api/auth/signup', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'reçu'
    })
    next();
  });

app.use('/api/stuff', stuffRoutes)

module.exports = app;