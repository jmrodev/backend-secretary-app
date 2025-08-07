'use strict'

var bcrypt = require('bcrypt');
var mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'jmro',
  password: process.env.DB_PASSWORD || 'jmro1975',
  database: process.env.DB_NAME || 'secretary_app'
});

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

// Authenticate using the database
exports.authenticate = function(name, pass, fn) {
  if (!module.parent) console.log('authenticating %s:%s', name, pass);
  connection.query('SELECT * FROM users WHERE name = ?', [name], function (error, results, fields) {
    if (error) return fn(error);
    if (results.length == 0) return fn(null, null);
    var user = results[0];
    bcrypt.compare(pass, user.hash, function (err, res) {
      if (err) return fn(err);
      if (res) return fn(null, user);
      fn(null, null)
    });
  });
};

// Function to create a new user
exports.createUser = function(name, pass, fn) {
  bcrypt.hash(pass, 10, function (err, hash) {
    if (err) return fn(err);
    connection.query('INSERT INTO users (name, hash) VALUES (?, ?)', [name, hash], function (error, results, fields) {
      if (error) return fn(error);
      fn(null, { id: results.insertId, name: name });
    });
  });
};
