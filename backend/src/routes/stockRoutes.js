const express = require('express');

const router = express.Router();

const {
    getStock,
    addStock,
    getStockHistory

} = require('../controllers/stockController');

router.get('/', getStock);

router.put('/add', addStock);

router.get('/history', getStockHistory);

module.exports = router;