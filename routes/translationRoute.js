const express = require('express');
const translationController = require('../controllers/translationController');

const router = express.Router();

router
    .route('/')
    .post(translationController.getTextTranslation)

module.exports = router;