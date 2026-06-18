const express = require('express');
const router = express.Router();

const {
    generateCoverageReport
} = require('../controllers/reportController');

router.get(
    '/coverage-pdf',
    generateCoverageReport
);

module.exports = router;