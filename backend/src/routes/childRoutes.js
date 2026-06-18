const express = require('express');
const router = express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const {
    registerChild,
    searchChild,
    updateChild,
    searchChildForCard
} = require('../controllers/childController');

router.post('/register',authMiddleware,registerChild);

router.get('/search', searchChild);
router.get('/card-search', searchChildForCard);

router.put('/:id', updateChild);

module.exports = router;