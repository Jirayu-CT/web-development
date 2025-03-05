const express = require('express');
const { getAllPublishers, addPublishers } = require('../controllers/publisherController.js');
const verifyToken = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.get('/publishers', verifyToken, getAllPublishers);
router.post('/add-publisher', verifyToken, addPublishers);

module.exports = router;