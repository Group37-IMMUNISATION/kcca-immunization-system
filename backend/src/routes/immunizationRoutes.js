const express = require('express');
const router = express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const {
    recordImmunization,
    getChildImmunizationHistory,
    getDueVaccines,
    getDefaulters,
    sendDefaulterReminder,
    getVaccinationCard
} = require('../controllers/immunizationController');

router.post(
    '/record',
    authMiddleware,
    recordImmunization
);

router.post(
    '/reminder/:child_id',
    sendDefaulterReminder
);

router.get(
    '/history/:child_id',
    authMiddleware,
    getChildImmunizationHistory
);

router.get(
    '/due/:child_id',
    authMiddleware,
    getDueVaccines
);

router.get(
    '/defaulters',
    authMiddleware,
    getDefaulters
);

router.get(
    '/card/:child_id',
    authMiddleware,
    getVaccinationCard
);

module.exports = router;