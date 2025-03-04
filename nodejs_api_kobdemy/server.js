const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.get('/api/user/profile', (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; //Bearer token
    console.log(token)
    const secretKey = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secretKey);
    res.json({decoded: decoded})
})


app.post('/api/user/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(username === 'admin' && password === '1234'){
        const payload = {id:1};
        const secretKey = process.env.SECRET_KEY;
        const expriesIn = { expiresIn: '1d' };
        const token = jwt.sign(payload, secretKey, expriesIn);
        res.json({token: token})
    }else{
        res.status(401).json({error: 'Invalid username or password'})
    }
})

//get request
app.get('/', (req, res) => {
    res.send('Hello Node.js API')
});

app.get('/hello', (req, res) => {
    res.send('Hello World!')
});

app.get('/hello/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Hello ${name}`)
});

app.get('/hello/:name/:age', (req, res) => {
    const name = req.params.name;
    const age = req.params.age;
    res.send(`Hello ${name, age}`)
});

app.post('/hello', (req, res) => {
    const name = req.body.name;
    res.send(name)
});

app.put('/user/update/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const age = req.body.age;
    res.send(`id: ${id} name: ${name} age:${age}`)
});

app.delete('/user/remove/:id', (req, res) => {
    const id = req.params.id;
    res.send(`remove id: ${id} `)
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});