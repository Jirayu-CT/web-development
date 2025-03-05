const express = require('express');
const { getAllCustomers, addCustomer } = require('../controllers/customerController.js');
const verifyToken = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.get('/customers', verifyToken, getAllCustomers);
router.post('/add', verifyToken, addCustomer);

module.exports = router;