//feedback-system\src\routes\feedbackRoutes.js

const express = require('express');
const { createFeedback, getFeedbacks } = require('../controllers/feedbackController');
const { checkAuth } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/services/:id/feedbacks', checkAuth, createFeedback);
router.get('/services/:id/feedbacks', getFeedbacks);

module.exports = router;