const express = require('express');
const { getAllBooks, addBook, editBook } = require('../controllers/bookController.js');
const verifyToken = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.get('/books', verifyToken, getAllBooks);
router.post('/book', verifyToken, addBook);
router.put('/edit-book/:id', verifyToken, editBook);

module.exports = router;