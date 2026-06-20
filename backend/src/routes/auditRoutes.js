const express = require('express');
const router = express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const {
    getAuditLogs,
    getRecentActivity
} = require('../controllers/auditController');

router.get(
    '/',
    authMiddleware,
    getAuditLogs
);

router.get(
    '/recent',
    authMiddleware,
    getRecentActivity
);

module.exports = router;