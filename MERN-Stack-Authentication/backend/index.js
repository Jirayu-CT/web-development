const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Routes
const authRouter = require('./router/auth');

// Middleware
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI);

app.use('/api/auth', authRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});