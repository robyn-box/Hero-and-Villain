require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const hbs = require('handlebars')

const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
var usersRouter = require('./routes/users');
// const createHeroRouter = require('./routes/createHero')
// const createVillianRouter = require('./routes/createVillian')
// const heroPowerCreateRouter = require('./routes/heroPowerCreate');
// const villianPowerCreateRouter = require('./routes/villainPowerCreate')
// const heroPowerAttachRouter = require('./routes/heroPowerAttach');
// const villianPowerAttachRouter = require('./routes/villainPowerAttach')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
// app.use('/createHero', createHeroRouter);
// app.use('/createVillian', createVillianRouter);
// app.use('/heroPowerCreate', heroPowerCreateRouter);
// app.use('/villianPowerCreate', villianPowerCreateRouter);
// app.use('/heroPowerAttach', heroPowerAttachRouter);
// app.use('/villianPowerAttach', villianPowerAttachRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404))
  // res.status(404);
  res.render('404')
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
