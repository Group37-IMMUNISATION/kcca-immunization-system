const express = require('express');

const router = express.Router();

const {
    getDashboardStats,
    getFacilityPerformance,
    getMonthlyImmunizations,
    getVaccineCoverage
} = require('../controllers/dashboardController');

const authMiddleware =
    require('../middleware/authMiddleware');
    

router.get('/stats', getDashboardStats);
router.get('/facility-performance',authMiddleware,getFacilityPerformance);
router.get('/monthly-immunizations',authMiddleware,getMonthlyImmunizations);
router.get('/vaccine-coverage',authMiddleware,getVaccineCoverage);

module.exports = router;