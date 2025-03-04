const db = require('../config/dbConfig.js');

// Get all books
const getAllBooks = async (req, res) => {
    try{
        const query = 'SELECT * FROM books';
        const [ books ] = await db.query(query);

        res.status(200).send({ 
            message: 'Books retrieved successfully',
            data: books
        });
    }
    catch(err){
        console.log(err)
        res.status(500).send(`Server error: ${err}`);
    }
};

//add book
const addBook = async (req, res) => {
    try{
        const { title, author, genre, published_year, isbn, pages, publisher, language, description } = req.body;

        if (!title || !author || !genre || !published_year || !isbn || !pages || !publisher || !language || !description) {
            return res.status(400).send('title, author, price, genre, published_year, isbn, pages, publisher, language, and description are required');
        }

        const query = 'INSERT INTO books (title, author, genre, published_year, isbn, pages, publisher, language, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        await db.query(query, [ title, author, genre, published_year, isbn, pages, publisher, language, description ]);

        res.status(201).send({ message: 'Book added successfully' });
    }
    catch(err){
        console.log(err)
        res.status(500).send(`Server error: ${err}`);
    }
};

//edit book
const editBook = async (req, res) => {
    try{
        const { id } = req.params;
        const { newTitle, newAuthor, newGenre, newPublished_year, newIsbn, newPages, newPublisher, newLanguage, newDescription } = req.body;

        const query = 'UPDATE books SET title = ?, author = ?, genre = ?, published_year = ?, isbn = ?, pages = ?, publisher = ?, language = ?, description = ? WHERE id = ?';
        const [ row ] = await db.query(query, [ newTitle, newAuthor, newGenre, newPublished_year, newIsbn, newPages, newPublisher, newLanguage, newDescription, id ]);

        //.affectedRows คือการเช็คว่ามีการเปลี่ยนแปลงข้อมูลในฐานข้อมูลหรือไม่
        if (row.affectedRows === 0) {
            return res.status(404).send('Book not found');
        }

        res.status(200).send({ message: 'Book updated successfully' });

    }
    catch(err){
        console.log(err)
        res.status(500).send(`Server error: ${err}`);
    }
};

module.exports = { getAllBooks, addBook, editBook };