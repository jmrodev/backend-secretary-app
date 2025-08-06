var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/search', function(req, res, next) {
  const query = req.query.q;
  if (query) {
    const foundUser = Object.values(User.users).find(user => user.name === query);
    if (foundUser) {
      res.send('Found user: ' + foundUser.name);
    } else {
      res.send('No user found with query: ' + query);
    }
  } else {
    res.send('Please provide a search query using ?q=your_query');
  }
});

router.get('/:name', function(req, res, next) {
  res.send('User: ' + req.user.name);
});

module.exports = router;