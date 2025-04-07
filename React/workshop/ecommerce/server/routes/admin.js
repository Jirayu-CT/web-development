// import
const express = require('express');
const router = express.Router();

//import auth middleware
const { authCheck } = require('../middlewares/authCheck');
//import controller
const { getOrderAdmin, changeOrderStatus } = require('../controllers/admin');


router.put('/admin/order-status', authCheck, changeOrderStatus );
router.get('/admin/orders', authCheck, getOrderAdmin );



module.exports = router;