require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const user = require('./user');
const employee= require('./employee');
const cors = require('cors'); 

app.use(express.json()); 

app.use(cors()); 

mongoose
  .connect(
    "mongodb+srv://hellychauhan373:ZnhSi7AYm5INPB7X@cluster0.nrtch.mongodb.net/Assignment1?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err.message));


  
app.use("/api/v1/user", user);

app.use("/api/v1/emp", employee); 

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Assignment 1</h1>");
});


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Server is listening on port 3000");
});