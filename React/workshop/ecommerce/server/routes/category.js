const express = require('express');
const router = express.Router();
const { create, list, remove } = require('../controllers/category');
const { authCheck, adminCheck } = require('../middlewares/authCheck');


router.post('/category', authCheck, adminCheck, create);
router.get('/category', authCheck, adminCheck, list);
router.delete('/category/:id', authCheck, adminCheck, remove);




module.exports = router;