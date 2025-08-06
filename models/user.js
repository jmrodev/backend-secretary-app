'use strict'

var bcrypt = require('bcrypt');

// dummy database

var users = {
  tj: { name: 'tj' }
};

// when you create a user, generate a salt
// and hash the password ('foobar' is the pass here)

bcrypt.hash('foobar', 10, function (err, hash) {
  if (err) throw err;
  // store the hash in the "db"
  users.tj.hash = hash;
});


// Authenticate using our plain-object database of doom!

exports.authenticate = function(name, pass, fn) {
  if (!module.parent) console.log('authenticating %s:%s', name, pass);
  var user = users[name];
  // query the db for the given username
  if (!user) return fn(null, null)
  // compare the POSTed password with the stored hash
  bcrypt.compare(pass, user.hash, function (err, res) {
    if (err) return fn(err);
    if (res) return fn(null, user)
    fn(null, null)
  });
};

exports.users = users;
