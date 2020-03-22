
var express = require('express');
var cors = require('cors');

var LandingPage = require('./routes/index');
var productsRouter = require('./routes/productsRouter');
var categoryRouter = require('./routes/categoryRouter');
var signupRouter = require('./routes/signupRouter');
var loginRouter = require('./routes/loginRouter');
var orderRouter = require('./routes/orderRouter');
var app = express();

app.use(express.json());
app.use(cors())

app.use('/', LandingPage);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/products', productsRouter);
app.use('/category', categoryRouter);
app.use('/order', orderRouter);




module.exports = app;
