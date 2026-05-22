const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
    recordImmunization,
    getChildImmunizationHistory,
    getDueVaccines,
    getDefaulters
} = require('../controllers/immunizationController');

router.post('/record', authMiddleware, recordImmunization);

router.get('/history/:child_id', authMiddleware, getChildImmunizationHistory);

router.get('/due/:child_id', authMiddleware, getDueVaccines);

router.get('/defaulters', authMiddleware, getDefaulters);

module.exports = router;