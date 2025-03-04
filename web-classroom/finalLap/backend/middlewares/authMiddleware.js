const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

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

module.exports = verifyToken;