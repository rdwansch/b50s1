const express = require('express');
const ContactController = require('../controllers/ContactController');
const router = express.Router();

router.get('/', ContactController.Page);

module.exports = router;
