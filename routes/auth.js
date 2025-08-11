'use strict'

var express = require('express');
var router = express.Router();
var auth = require('../controllers/authController');

router.get('/', function(req, res){
  res.redirect('/login');
});

router.get('/restricted', auth.restrict, function(req, res){
  res.redirect('/dashboard');
});

router.get('/logout', auth.logout);

router.get('/login', function(req, res){
  res.render('login', { title: 'Login' });
});

router.post('/login', auth.login);

router.get('/signup', function(req, res){
  res.render('signup', { title: 'Sign Up' });
});

router.post('/signup', auth.signup);

module.exports = router;
