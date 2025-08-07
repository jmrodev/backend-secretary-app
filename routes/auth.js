'use strict'

var express = require('express');
var router = express.Router();
var auth = require('../controllers/authController');

router.get('/', function(req, res){
  res.redirect('/login');
});

router.get('/restricted', auth.restrict, function(req, res){
  res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
});

router.get('/logout', auth.logout);

router.get('/login', function(req, res){
  res.render('login');
});

router.post('/login', auth.login);

router.get('/signup', function(req, res){
  res.render('signup');
});

router.post('/signup', auth.signup);

module.exports = router;
