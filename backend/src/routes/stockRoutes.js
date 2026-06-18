const express = require('express');

const router = express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const {
    getStock,
    addStock,
    getStockHistory
} = require('../controllers/stockController');

router.get(
    '/',
    authMiddleware,
    getStock
);

router.put(
    '/add',
    authMiddleware,
    addStock
);

router.get(
    '/history',
    authMiddleware,
    getStockHistory
);

module.exports = router;