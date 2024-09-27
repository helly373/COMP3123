const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/hello', (req, res) =>{
    res.send('Hello Express JS');
});

app.get('/user', (req, res) => {
    const {firstName, lastName} = req.query;
    res.send(`Hello ${firstName} ${lastName}`);
});

app.post('/user/:firstName/:lastName', (req, res) => {
    const{firstName, lastName} = req.params;
    res.send(`User created with parameters : ${firstName} ${lastName}`);
});

//server start
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});