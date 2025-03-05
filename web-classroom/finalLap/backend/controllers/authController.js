const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/dbConfig.js');
const SECRET_KEY = process.env.SECRET_KEY;

// Register
const register = async (req, res) => {
    try{
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
    }
    catch(err){
        console.log(err)
        res.status(500).send(`API register error: ${err}`);
    }
};

// Login
const login = async (req, res) => {
    try{
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
            { expiresIn: '2h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // false ช่วงพัฒนา , true ช่วง Production
            sameSite: 'none', // Start with Lax to test, then Strict in production
            maxAge: 3600000*2 // ประมาณ 1 ชม.     
        })

        res.status(200).send({ 
            message: 'Login successful',
            token: token
        });
    }
    catch(err){
        console.log(err)
        res.status(500).send(`Server error: ${err}`);
    }
};

// Logout
const logout = async (req, res) => {
    try{
        res.cookie('token', '', { 
            maxAge: 0, 
            httpOnly: true, 
            secure: false, 
            sameSite: 'Strict' 
        });
        res.status(200).send({ message: 'Logout successful' });
    }
    catch(err){
        console.log(err)
        res.status(500).send(`Server error: ${err}`);
    }
};

module.exports = { register, login, logout };