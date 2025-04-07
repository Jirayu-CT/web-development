const express = require('express');
const router = express.Router();
const { create, list, remove } = require('../controllers/category');


router.post('/category', create);
router.get('/category', list);
router.delete('/category/:id', remove);




module.exports = router;