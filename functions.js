const bcrypt = require('bcryptjs');
const config = require('./config.json');
const jwt = require('jsonwebtoken');

exports.getType = function(config) {
  if ([
    'postgres',
    'mssql',
    'sqlite',
    'mysql',
  ].includes(config.database.dialect)) {
    return 'sql';
  } else return config.database.dialect;
};
exports.encrypt = function(password, callback) {
  bcrypt.genSalt(config.password.hash_len, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      callback(hash);
    });
  });
};
exports.random = function(length) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabc' +
    'defghijklmnopqrstuvwxyz0123456789';
  text = '';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

exports.isEmpty = function(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

exports.auth = function(user) {
  const token = jwt.sign(user,
      config.JWT.secret, {
        expiresIn: config.JWT.expiresIn,
      });

  const {
    iat,
    exp,
  } = jwt.decode(token);
  return {
    token,
    iat,
    exp,
  };
};
