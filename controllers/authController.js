'use strict'

var User = require('../models/user');

exports.restrict = function(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
};

exports.isAdmin = function(req, res, next) {
  if (req.session.user && req.session.user.is_admin) {
    next();
  } else {
    req.session.error = 'Access denied. Administrator privileges required.';
    res.redirect('/login');
  }
};

exports.login = function(req, res, next) {
  if (!req.body) return res.sendStatus(400)
  User.authenticate(req.body.username, req.body.password, function(err, user){
    if (err) return next(err)
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation
      req.session.regenerate(function(){
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        req.session.success = 'Authenticated as ' + user.name
          + ' click to <a href="/logout">logout</a>. '
          + ' You may now access <a href="/restricted">/restricted</a>.';
        res.redirect(req.get('Referrer') || '/');
      });
    } else {
      req.session.error = 'Authentication failed, please check your '
        + ' username and password.'
        + ' (use "tj" and "foobar")';
      res.redirect('/login');
    }
  });
};

exports.logout = function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function(){
    res.redirect('/');
  });
};

exports.signup = function(req, res, next) {
  if (!req.body) return res.sendStatus(400)
  User.createUser(req.body.username, req.body.password, function(err, user){
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        req.session.error = 'User already exists, try a different username.';
        return res.redirect('/signup');
      }
      console.error(err);
      return next(err);
    }
    req.session.success = 'User created! You may now login.';
    res.redirect('/login');
  });
};


