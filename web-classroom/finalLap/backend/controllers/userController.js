const bcrypt = require('bcrypt');
const db = require('../config/dbConfig.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//get all users
const getAllUsers = async (req, res) => {
    try{
        const query = 'SELECT * FROM users';
        const [ users ] = await db.query(query);

        res.status(200).send({ 
            message: 'Users retrieved successfully',
            data: users
        });
    }
    catch(err){
        console.log(err)
        res.status(500).send(`Server error: ${err}`);
    }
};

// Get Profile
const getProfile = async (req, res) => {
    try{
        let token = req.headers['authorization'];
        if (!token) {
            return res.status(401).send('Token not provided');
        }
        
        const query = 'SELECT * FROM users WHERE id = ?';
        const [ row ] = await db.query(query, [req.user.id]);

        if(row.length === 0){
            return res.status(404).send('User not found');
        }

        const user = row[0];
        res.status(200).send({ 
            message: 'Profile retrieved successfully', 
            id: user.id,
            username: user.username,
            email: user.email
        });
    }
    catch(err){
        console.log(err)
        res.status(500).send(`Server error: ${err}`);
    }
};

//edit user password
const editPassword = async (req, res) => {
    try{
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
    }
    catch(err){
        console.log(err)
        res.status(500).send(`Server error: ${err}`);
    }
};

module.exports = { getAllUsers, getProfile, editPassword };