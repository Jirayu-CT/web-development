const express = require('express');
const { getAllUsers, getProfile, editPassword } = require('../controllers/userController.js');
const verifyToken = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.get('/users', verifyToken, getAllUsers);
router.get('/profile', verifyToken, getProfile);
router.put('/edit-password', verifyToken, editPassword);

module.exports = router;