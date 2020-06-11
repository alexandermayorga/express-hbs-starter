var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const xhbs = require('express-handlebars'); //Templating Engine
const mongoose = require('mongoose'); //Mongoose - DB util

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//// ############# HBS SETUP ############# ////
app.engine('hbs', xhbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
//// ############# HBS SETUP ############# ////


// ROUTES
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;

    const errors = {
        status:  err.status,
        stack: err.stack
    };

    res.locals.error = req.app.get('env') === 'development' ? errors : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;