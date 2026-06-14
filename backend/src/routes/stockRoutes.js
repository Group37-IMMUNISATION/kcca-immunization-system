const express = require('express');

const router = express.Router();

const {
    getStock,
    addStock

} = require('../controllers/stockController');

router.get('/', getStock);

router.put('/add', addStock);

module.exports = router;