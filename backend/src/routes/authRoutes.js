const express = require('express');
const router = express.Router();

const authMiddleware =require('../middleware/authMiddleware');

const {
    registerUser,
    loginUser,
    getUsers,
    deactivateUser
} = require('../controllers/authController');

router.get('/users',getUsers);

router.post('/register', registerUser);
router.post('/login', loginUser);

router.put('/deactivate/:user_id', authMiddleware,deactivateUser);

module.exports = router;