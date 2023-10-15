const express = require('express');
const TestimonialController = require('../controllers/TestimonialController');
const router = express.Router();

router.get('/testimonial', TestimonialController.Page);

module.exports = router;
