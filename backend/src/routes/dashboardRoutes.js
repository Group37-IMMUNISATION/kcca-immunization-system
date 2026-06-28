const express = require('express');

const router = express.Router();

const {
    getDashboardStats,
    getFacilityPerformance,
    getMonthlyImmunizations,
    getVaccineCoverage,
    getNotifications,
    getFacilityCoverage,
    getLowStockVaccines,
    getDashboardCharts,
    getRecentActivity,
    getActivitySummary

    
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

router.get(
    "/charts",
    authMiddleware,
    getDashboardCharts
);

router.get(
    "/activity",
    authMiddleware,
    getRecentActivity
);

router.get(
    "/activity-summary",
    authMiddleware,
    getActivitySummary
);

module.exports = router;