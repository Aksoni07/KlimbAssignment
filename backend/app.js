const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use('/api/candidates', routes);


const connectToMongoDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("Error encountered while connecting to MongoDB:", err);
        process.exit(1);
    }
};

connectToMongoDB();

module.exports = app;