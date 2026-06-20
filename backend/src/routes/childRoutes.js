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

router.post(
    '/register',
    authMiddleware,
    registerChild
);

router.get(
    '/search',
    authMiddleware,
    searchChild
);

router.get(
    '/card-search',
    authMiddleware,
    searchChildForCard
);

router.put(
    '/:id',
    authMiddleware,
    updateChild
);

module.exports = router;