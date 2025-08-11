'use strict'

var express = require('express');
var path = require('path');
var session = require('express-session');

var authRoutes = require('./routes/auth');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRoutes = require('./routes/admin');
var User = require('./models/user');

var app = module.exports = express();

// config

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// middleware

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}));

// Session-persisted message middleware
app.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});

app.use('/', authRoutes);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRoutes);

// Param middleware for user loading
app.param('name', function(req, res, next, name){
  var user = User.users[name];
  if (user) {
    req.user = user;
    next();
  } else {
    next(new Error('failed to load user'));
  }
});

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
  res.render('error', { title: 'Error' });
});

/* istanbul ignore next */
if (!module.parent) {
  const port = process.env.PORT || 3000;
  app.listen(port);
  console.log('Express started on port ' + port);
}