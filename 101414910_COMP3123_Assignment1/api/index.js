const mongoose = require('mongoose');
const express = require('express');
const userRouter = require('./user');
const employeeRouter = require('./employee');

const app = express();
app.use(express.json());

const DB_URL = "mongodb+srv://hellychauhan373:ZnhSi7AYm5INPB7X@cluster0.nrtch.mongodb.net/Assignment1?retryWrites=true&w=majority&appName=Cluster0";

mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/emp", employeeRouter);

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});

module.exports = app; // Export the app for Vercel to use
