
var express = require('express');


var LandingPage = require('./routes/index');
var productsRouter = require('./routes/productsRouter');
var categoryRouter = require('./routes/categoryRouter');
var signupRouter = require('./routes/signupRouter');
var loginRouter = require('./routes/loginRouter');
var app = express();

app.use(express.json());


app.use('/', LandingPage);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/products', productsRouter);
app.use('/category', categoryRouter);




module.exports = app;
