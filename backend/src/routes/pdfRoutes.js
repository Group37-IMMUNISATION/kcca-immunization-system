const express = require('express');
const router = express.Router();

const pdfController =
    require('../controllers/pdfController');

console.log(pdfController);

router.get(
    '/vaccination-card/:child_id',
    pdfController.generateVaccinationCard
);

module.exports = router;