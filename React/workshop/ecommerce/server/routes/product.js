const express = require('express');
const router = express.Router();
const { create, list, read, update, remove, listby, searchFilters, createImages, removeImage } = require('../controllers/product');
const { authCheck, adminCheck } = require('../middlewares/authCheck')

//@ENDPOINT http://localhost:8080/api/product
router.post('/product', create)
router.get('/products/:count', list)
router.get('/product/:id', read) //update
router.put('/product/:id', update) //update
router.delete('/product/:id', remove)
router.post('/productby', listby)
router.post('/search/filters', searchFilters)

router.post('/images', authCheck, adminCheck, createImages)
router.post('/removeimage', authCheck, adminCheck, removeImage)





module.exports = router;