const express = require('express');
const router = express.Router();

const {
    registerChild,
    searchChild
} = require('../controllers/childController');

router.post('/register', registerChild);

router.get('/search', searchChild);

module.exports = router;