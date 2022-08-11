const express = require('express');

const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Success');
    })
    .catch((err) => {
        console.log('err', err);
    });

app.use(express.json());
app.use('/api/auth', authRoute);

app.listen(process.env.PORT || 8000, () => {
    console.log('Backend Server is running');
});
