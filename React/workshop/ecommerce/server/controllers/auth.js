const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async(req, res) => {
    //code
    try{
        //code
        const { email, password } = req.body;
        console.log(email, password);
        if(!email || !password){
            return res.status(400).json({
                message: 'Email and password are required!!!'
            });
        }
        //check email in db already exist or not
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if(user){
            return res.status(400).json({
                message: 'Email already exist!!!'
            });
        }

        //hash password
        const hashPassword = await bcrypt.hash(password, 10);

        //create user in db
        await prisma.user.create({
            data: {
                email: email,
                password: hashPassword
            }
        })

        res.end('Register Successfully!');
    }
    catch(err){
        //error
        console.log(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

exports.login = async(req, res) => {
    //code
    try{
        //code
        const { email, password } = req.body;
        //step 1: check email and password are required or not
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if(!user || !user.enabled){
            return res.status(400).json({
                message: 'User not found or disabled!!!'
            });
        }
        //step 2: check password is correct or not
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message: 'Invalid password!!!'
            });
        }
        //step 3: Create Payload for JWT token
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
        }
        //step 4: Create JWT token
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1day'
        }, (err, token) => {
            if(err){
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }
            res.json({
                payload: payload,
                token: token
            })
        })
    }
    catch(err){
        //error
        console.log(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

exports.currentUser = async(req, res) => {
    //code
    try{
        //code
        const user = await prisma.user.findFirst({
            where: {
                email: req.user.email
            },
            select: {
                id: true, 
                name: true,
                email: true,
                role: true,
            }
        })
        res.json({
            user: user
        });
    }
    catch(err){
        //error
        console.log(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}
