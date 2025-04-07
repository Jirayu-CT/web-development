const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');
const { JWT_SECRET } = process.env;

exports.authCheck = async (req, res, next) => {
    try {
        //code
        const headerToken = req.headers.authorization
        if (!headerToken) {
            return res.status(401).json({ message: "No Token, Authorization" })
        }
        const token = headerToken.split(" ")[1]
        const decode = jwt.verify(token, JWT_SECRET)
        req.user = decode

        const user = await prisma.user.findFirst({
            where: {
                email: req.user.email
            }
        })
        if (!user.enabled) {
            return res.status(400).json({ message: 'This account cannot access' })
        }

        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Token Invalid' })
    }
}

exports.adminCheck = async(req, res, next) => {
    try {
        const { email } = req.user; // Assuming req.user is set by authCheck
        console.log('User Email:', email);
        const adminUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if(!adminUser || adminUser.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        next();
    } catch (error) {
        console.error('Error in adminCheck middleware:', error);
        res.status(500).json({ message: 'Error: Token Invalid' });
    }
}