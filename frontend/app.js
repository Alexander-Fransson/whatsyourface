const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 2000;
const app = express();
const {getAndRender,postAndRender} = require('./public/js/requests.js');

app.use(express.static('public'));

app.set('views','./views');
app.set('view engine','ejs');

app.get('/', (req,res) => {
   getAndRender(res); 
});

app.get('/post',(req,res) => {
    //postAndRender(req,res);  
    console.log(req);
    getAndRender(res);  
});

app.listen(port, (req,res) => {
    console.log('vibing on port '+port);
});
