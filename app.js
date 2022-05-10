require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const hbs = require('hbs')
const saltRounds = +process.env.SALT
const secret = process.env.SECRET

const startrouter = require('./routes/start')
const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const usersRouter = require('./routes/users');
const createherorouter = require('./routes/createhero')
const createvillainrouter = require('./routes/createvillain')
const heropowercreaterouter = require('./routes/heropowercreate');
const villainpowercreaterouter = require('./routes/villainpowercreate')
const herodetailsrouter = require('./routes/herodetails')
const villaindetailsrouter = require('./routes/villaindetails')
const heropowerattachrouter = require('./routes/heropowerattach');
const heropowerdetachrouter = require('./routes/heropowerdetach')
const villainpowerattachrouter = require('./routes/villainpowerattach')
const villainpowerdetachrouter = require('./routes/villainpowerdetach')
const heroeditrouter = require('./routes/heroedit')
const villaineditrouter = require('./routes/villainedit')
const herodeleterouter = require('./routes/herodelete')
const villaindeleterouter = require('./routes/villaindelete')

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
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', startrouter)
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/createhero', createherorouter);
app.use('/createvillain', createvillainrouter);
app.use('/heropowercreate', heropowercreaterouter);
app.use('/villainpowercreate', villainpowercreaterouter);
app.use('/herodetails', herodetailsrouter)
app.use('/villaindetails', villaindetailsrouter)
app.use('/heropowerattach', heropowerattachrouter);
app.use('/heropowerdetach', heropowerdetachrouter)
app.use('/villainpowerattach', villainpowerattachrouter)
app.use('/villainpowerdetach', villainpowerdetachrouter)
app.use('/heroedit', heroeditrouter)
app.use('/villainedit', villaineditrouter)
app.use('/herodelete', herodeleterouter)
app.use('/villaindelete', villaindeleterouter)

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
  res.status(500).json({
    message: err.message,
    error: err
  });
 
});

module.exports = app;
