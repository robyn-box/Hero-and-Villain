require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const hbs = require('handlebars')
const saltRounds = +process.env.SALT
const secret = process.env.SECRET

const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
var usersRouter = require('./routes/users');
const createHeroRouter = require('./routes/createHero')
// const createVillianRouter = require('./routes/createVillian')
// const heroPowerCreateRouter = require('./routes/heroPowerCreate');
// const villianPowerCreateRouter = require('./routes/villainPowerCreate')
// const heroPowerAttachRouter = require('./routes/heroPowerAttach');
// const villianPowerAttachRouter = require('./routes/villainPowerAttach')

const app = express();

// Mongo DB connection
mongoose.connect(process.env.DB_URI , {
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(res => console.log("DB Connected"))
.catch(err => console.log(err))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// hbs.registerPartials(__dirname + /views/partials)
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/createHero', createHeroRouter);
// app.use('/createVillian', createVillianRouter);
// app.use('/heroPowerCreate', heroPowerCreateRouter);
// app.use('/villianPowerCreate', villianPowerCreateRouter);
// app.use('/heroPowerAttach', heroPowerAttachRouter);
// app.use('/villianPowerAttach', villianPowerAttachRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
  
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
