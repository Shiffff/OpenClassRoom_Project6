const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const stuffCtrl = require('../controllers/stuff')


router.post('/', auth, multer, stuffCtrl.createSauce);      
router.get('/', auth, stuffCtrl.getAllSauces);
router.get('/:id', auth, stuffCtrl.getOneSauces);
router.put('/:id', auth, multer, stuffCtrl.putSauces);
router.delete('/:id', auth, stuffCtrl.deleteSauces);
router.post('/:id/like', auth, stuffCtrl.likeSauces);



module.exports = router;