const express  = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const credentials = require('./middleware/credentials');
const verifyJWT = require('./middleware/verifyJWT');
const PORT  =  3500;

connectDB();
// To connect to the database
app.use(credentials);

app.use(cors(corsOptions)); 
//TO handle CORS ----> See Readme for Explanation of CORS

app.use(express.urlencoded({extended: false}));
//To handle Form data ---> This will be important as we will need to send form data such as username, password, pictures etc

app.use(express.json());
//To handle simple JSON data ----> See Readme for explanation of JSON
app.use('/images', express.static('images'));

// To serve simple static files like css, images, etc

app.use(cookieParser());
// To handle cookie requests

app.use('/', require('./routes/root'));
app.use('/products', require('./routes/product'));
app.use('/checkout', require('./routes/checkout'));


app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/email', require('./routes/email'));

app.use(verifyJWT);
app.use('/users',  require('./routes/user')); 

mongoose.connection.once('open', ()=> {
    console.log(`Connected to MongoDB`);
})

app.listen(PORT, ()=> console.log(`SERVER RUNNING ON PORT ${PORT}!`));
// Starting the server! 