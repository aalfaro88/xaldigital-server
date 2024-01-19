// app.js
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors');

var usersRouter = require('./routes/users');
var stackoverflowRoutes = require('./api/stackoverflowRoutes');
var flightsRoutes = require('./routes/flightsRoutes');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1);
app.enable('trust proxy');

app.use(
    cors({
      origin: [process.env.REACT_APP_URI] 
    })
  );

app.use('/users', usersRouter);
app.use('/api',stackoverflowRoutes);
app.use('/flights',flightsRoutes);

module.exports = app;

