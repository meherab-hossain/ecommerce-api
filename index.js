const express = require('express');

const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Success');
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(process.env.PORT || 8000, () => {
    console.log('Backend Server is running');
});
