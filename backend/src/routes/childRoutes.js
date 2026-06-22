const express = require('express');
const router = express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const {
    registerChild,
    searchChild,
    updateChild,
    searchChildForCard,
    getChildProfile,
    sendReminder
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

router.get(
    '/profile/:id',
    authMiddleware,
    getChildProfile
);

router.get(
    '/reminder/:id',
    authMiddleware,
    sendReminder
);

module.exports = router;