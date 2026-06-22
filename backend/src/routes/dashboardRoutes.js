const express = require('express');

const router = express.Router();

const {
    getDashboardStats,
    getFacilityPerformance,
    getMonthlyImmunizations,
    getVaccineCoverage,
    getNotifications,
    getFacilityCoverage,
    getLowStockVaccines

    
} = require('../controllers/dashboardController');

const authMiddleware =
    require('../middleware/authMiddleware');

router.get(
    '/stats',
    authMiddleware,
    getDashboardStats
);

router.get(
    '/facility-performance',
    authMiddleware,
    getFacilityPerformance
);

router.get(
    '/monthly-immunizations',
    authMiddleware,
    getMonthlyImmunizations
);

router.get(
    '/vaccine-coverage',
    authMiddleware,
    getVaccineCoverage
);

router.get(
    '/notifications',
    authMiddleware,
    getNotifications
);

router.get(
    '/facility-coverage',
    authMiddleware,
    getFacilityCoverage
);

router.get(
    '/low-stock',
    authMiddleware,
    getLowStockVaccines
);

module.exports = router;