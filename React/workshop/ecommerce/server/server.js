//Step1 import 
const express = require('express');
const morgan = require('morgan');
const { readdirSync } = require('fs');
const app = express();
const cors = require('cors');

// const authRouter = require('./routes/auth');
// const categoryRouter = require('./routes/category');

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors())


readdirSync('./routes').map((c) => app.use('/api', require('./routes/' + c)))



//step3 Router
// app.post('/api', (req, res) => {
//     const { username, password } = req.body;
//     console.log('Username:', username);
//     console.log('Password:', password);
//     res.send("Data received successfully!");
// })


//start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});