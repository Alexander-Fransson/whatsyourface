const express = require('express');
const connectDB = require('./config/db.js');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 6000;
const router = require('./routes/nameRoutes.js');
const imageRouter = require('./routes/imageRoutes.js'); 

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/names', router);
app.use('/api/img', imageRouter);

app.listen(port, () => {
    console.log('listening to port '+port);
});