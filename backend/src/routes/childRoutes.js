const express = require('express');
const router = express.Router();

const {
    registerChild,
    searchChild,
    updateChild,
    searchChildForCard
} = require('../controllers/childController');

router.post('/register', registerChild);
router.get('/search', searchChild);
router.get(
    '/card-search', searchChildForCard);
router.put('/:id', updateChild);

module.exports = router;