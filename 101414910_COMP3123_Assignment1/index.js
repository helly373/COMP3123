const express = require('express');
// const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const user = require('./user');
const employee= require('./employee');

app.use(express.json()); 
const DB_URL = "mongodb+srv://hellychauhan373:ZnhSi7AYm5INPB7X@cluster0.nrtch.mongodb.net/Assignment1?retryWrites=true&w=majority&appName=Cluster0"


mongoose.Promise = global.Promise;

// TODO - Update your mongoDB Atals Url here to Connect to the database
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use("/api/v1/user", user); // Change 'userRoutes' to 'userRouter'

app.use("/api/v1/emp", employee); // Define employee-related API routes

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Assignment 1</h1>");
});


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});