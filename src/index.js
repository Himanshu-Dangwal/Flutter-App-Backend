const express = require("express");
const mongoose = require('mongoose');
const authRoute = require('../routes/auth')

const cors = require('cors');
const dotenv = require('dotenv')

dotenv.config();
const app = express()

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017'

app.use(cors());

async function connectToMongo(){
   mongoose.set("strictQuery", false);
    mongoose.connect(dbUrl);
    console.log("Succesfully connected to mongoDB database")
}

connectToMongo().catch(err => console.log("Some error"));


// middleware
app.use(express.json())


// Routes
app.get('/', (req, res) => {
    res.send("Hello world")
})

app.use('/api/auth', authRoute)


const port = process.env.PORT || 8080
app.listen(port, (req, res) => {
    console.log('Listening to the port 8080');
})
