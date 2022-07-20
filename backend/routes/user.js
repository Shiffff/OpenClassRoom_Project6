const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const password = require('../middleware/password')


router.post('/signup', password, userCtrl.signup);    // route uniquement (logique importé via controllers)
router.post('/login', userCtrl.login);      

module.exports = router;        // exportation pour pouvoir l'importé dans app.Js
