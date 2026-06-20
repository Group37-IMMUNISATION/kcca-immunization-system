const express = require('express');
const router = express.Router();

const authMiddleware =require('../middleware/authMiddleware');

const {
    registerUser,
    loginUser,
    getUsers,
    deactivateUser,
    activateUser
} = require('../controllers/authController');

router.get('/users',getUsers);

router.post('/register',authMiddleware,registerUser);
router.post('/login', loginUser);

router.put('/deactivate/:user_id', authMiddleware,deactivateUser);
router.put('/activate/:user_id',authMiddleware,activateUser);

module.exports = router;