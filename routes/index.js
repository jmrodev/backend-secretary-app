var express = require('express');
var router = express.Router();
var auth = require('../controllers/authController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dashboard', auth.restrict, function(req, res){
  res.render('dashboard', { title: 'Dashboard', user: req.session.user });
});

module.exports = router;
