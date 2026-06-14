const express = require('express');
const router = express.Router();

const {
    registerChild,
    searchChild,
    updateChild
} = require('../controllers/childController');

router.post('/register', registerChild);
router.get('/search', searchChild);
router.put('/:id', updateChild);

module.exports = router;