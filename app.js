var createError = require('http-errors');
var express = require('express');
var path = require('path');
const { create } = require("express-handlebars");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

// var MongoClient = require('mongodb').MongoClient
var fileUpload = require('express-fileUpload')
var db = require('./config/connection')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var adminLoginRouter = require('./routes/admin-login');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
const hbs = create({
  layoutsDir: `${__dirname}/views/layout`,
  extname: `hbs`,
  defaultLayout: 'layout',
  partialsDir: `${__dirname}/views/partials`
});

app.engine('hbs',hbs.engine)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload())
app.use(session({
  secret: "secret",
  cookie : {maxAge : 600000}
}))

// caching disabled for every route
app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

db.connect((err)=>{
  if(err) console.log("Coudnt connect"+err);
  else console.log("Database Connected to port 27017"); 
})


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/adminlogin', adminLoginRouter);
app.use('/admin-log', adminLoginRouter);
app.use('/', adminLoginRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
