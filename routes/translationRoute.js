const express = require('express');
const translationController = require('../controllers/translationController');

const router = express.Router();

// Route handler for getTextTranslation controller
router
    .route('/')
    .post(translationController.getTextTranslation)

module.exports = router;
