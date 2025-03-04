const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors'); // Added this line
const bcrypt = require('bcryptjs');
const db = require('./config/dbConfig.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY;

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Token verification middleware
const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers['authorization'];
        if (!token) {
            return res.status(401).send('Token not provided');
        }

        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                console.error("❌ Token verification failed: ", err.message);
                return res.status(401).send('Invalid token');
            }

            req.user = user;
            next();
        });
    } catch (err) {
        console.error("❌ Error in verifyToken middleware: ", err.message);
        res.status(500).send('Internal server error');
    }
}

// Get all users
app.get('/api/users', async (req, res) => {
    try {
        const query = 'SELECT * FROM users';
        const [ users ] = await db.query(query);

        res.status(200).send({ 
            message: 'Users retrieved successfully',
            data: users
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(`Server error: ${err}`);
    }
});

// Register
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).send('username, email, and password are required');
        }

        const query = 'SELECT username, email FROM users WHERE username = ? OR email = ?';
        // Check if username or email already exists
        const [ existingUser ] = await db.query(query, [username, email]);
        if (existingUser.length > 0) {
            if (existingUser[0].username === username || existingUser[0].email === email) {
                return res.status(400).send('username or email already exists');
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        await db.query(insertQuery, [username, email, hashedPassword]);

        res.status(201).send({
            message: 'User registered successfully'
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(`API register error: ${err}`);
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send('username and password are required');
        }

        const query = 'SELECT * FROM users WHERE username = ?';
        const [ row ] = await db.query(query, [username]);

        if (row.length === 0) {
            return res.status(400).send('Invalid username or password');
        }

        const user = row[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send('Invalid username or password');
        }

        const payload = {
            id: user.id,
            username: user.username,
            email: user.email
        };

        const token = jwt.sign(
            payload, 
            SECRET_KEY, 
            { expiresIn: '1h' }
        );

        res.cookie('token', token, { 
            httpOnly: true,
            secure: false,
            sameSite: 'none',
            maxAge: 3600000 // 1 hour
        });

        res.status(200).send({ message: 'Login successful' });
    } catch (err) {
        console.log(err);
        res.status(500).send(`Server error: ${err}`);
    }
});

// Edit user password
app.post('/api/edit-password', verifyToken, async (req, res) => {
    try {
        const { newPassword, oldPassword } = req.body;
        const userId = req.user.id;

        if (!newPassword || !oldPassword) {
            return res.status(400).send('newPassword and oldPassword are required');
        }

        const query = 'SELECT * FROM users WHERE id = ?';
        const [ row ] = await db.query(query, [userId]);

        if (row.length === 0) {
            return res.status(400).send('User not found');
        }

        const user = row[0];
        const validPassword = await bcrypt.compare(oldPassword, user.password);
        if (!validPassword) {
            return res.status(400).send('old password is incorrect');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatePasswordQuery = 'UPDATE users SET password = ? WHERE id = ?';
        await db.query(updatePasswordQuery, [hashedPassword, userId]);

        res.status(200).send({ message: 'Password updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send(`Server error: ${err}`);
    }
});

// Logout
app.post('/api/logout', (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).send({ message: 'Logout successful' });
    } catch (err) {
        console.log(err);
        res.status(500).send(`Server error: ${err}`);
    }
});

// Get Profile
app.post('/api/profile', verifyToken, async (req, res) => {
    try {
        const query = 'SELECT * FROM users WHERE id = ?';
        const [ row ] = await db.query(query, [req.user.id]);

        if (row.length === 0) {
            return res.status(404).send('User not found');
        }

        const user = row[0];
        res.status(200).send({ 
            message: 'Profile retrieved successfully', 
            id: user.id,
            username: user.username,
            email: user.email
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(`Server error: ${err}`);
    }
});

// Get all books
app.post('/api/books', verifyToken, async (req, res) => {
    try {
        const query = 'SELECT * FROM books';
        const [ books ] = await db.query(query);

        res.status(200).send({ 
            message: 'Books retrieved successfully',
            user: req.user,
            data: books
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(`Server error: ${err}`);
    }
});

// Add book
app.post('/api/add-book', verifyToken, async (req, res) => {
    try {
        const { title, author, genre, published_year, isbn, pages, publisher, language, description } = req.body;

        if (!title || !author || !genre || !published_year || !isbn || !pages || !publisher || !language || !description) {
            return res.status(400).send('title, author, price, genre, published_year, isbn, pages, publisher, language, and description are required');
        }

        const query = 'INSERT INTO books (title, author, genre, published_year, isbn, pages, publisher, language, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        await db.query(query, [ title, author, genre, published_year, isbn, pages, publisher, language, description ]);

        res.status(201).send({ message: 'Book added successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send(`Server error: ${err}`);
    }
});

// Edit book
app.put('/api/edit-book/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { newTitle, newAuthor, newGenre, newPublished_year, newIsbn, newPages, newPublisher, newLanguage, newDescription } = req.body;

        const query = 'UPDATE books SET title = ?, author = ?, genre = ?, published_year = ?, isbn = ?, pages = ?, publisher = ?, language = ?, description = ? WHERE id = ?';
        const [ row ] = await db.query(query, [ newTitle, newAuthor, newGenre, newPublished_year, newIsbn, newPages, newPublisher, newLanguage, newDescription, id ]);

        // .affectedRows คือการเช็คว่ามีการเปลี่ยนแปลงข้อมูลในฐานข้อมูลหรือไม่
        if (row.affectedRows === 0) {
            return res.status(404).send('Book not found');
        }

        res.status(200).send({ message: 'Book updated successfully' });

    } catch (err) {
        console.log(err);
        res.status(500).send(`Server error: ${err}`);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});