var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

require('./auth/aut')


var uuid = require('uuid/v4')
var session = require('express-session')
var FileStore = require('session-file-store')(session)
var passport = require('passport')

var app = express();


//Estabelecimento da ligação á base de dados
var mongoose = require('mongoose')


const config = {
  autoIndex: false,
  useNewUrlParser: true,
};


mongoose
  .connect('mongodb://127.0.0.1/register',config)
  .then(() => console.log('Mongo status: ' + mongoose.connection.readyState))
  .catch(() => console.log('Mongo: erro na conexão.'))


// Sessions

app.use(session({
  genid: () =>{
    return uuid()
  },
  store: new FileStore(),
  secret: 'vr2019',
  resave: false,
  saveUninitialized: true
}))


// Inicialização do passport
app.use(passport.initialize())
app.use(passport.session())


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
