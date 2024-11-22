//feedback-system\src\routes\serviceRoutes.js

const express = require('express');
const { createService, getServices } = require('../controllers/serviceController');
const { checkAuth, checkAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', checkAuth, checkAdmin, createService);
router.get('/', getServices);

module.exports = router;