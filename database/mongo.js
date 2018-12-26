const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const encrypt = require('../functions').encrypt;
const isEmpty = require('../functions').isEmpty;
const config = require('../config.json');
exports.init = function connect(config, callback) {
  /**
   * This function establishes a connection and calls a callback it is given
   * @param {Object} config Configuration object
   * @param {function} callback Callback Function
   */
  const Prompt = require('prompt-password');
  const prompt = new Prompt(config.password);
  prompt.run()
      .then(function(answers) {
        mongoose.connect(
            `mongodb://${config.database.username}:` +
        `${answers}@${config.database.host}:` +
        `${config.database.port}/${config.database.db_name}`, {
              useNewUrlParser: true,
            }
        );
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
          console.log('Connection to Database successfully established');
          callback(db).listen(config.server.port);
        });
      });
};

exports.get = function(connection, req) {
  const Model = require(`../models/mongodb/${req.params.model}.js`);
  return new Promise(function(resolve, reject) {
    if (isEmpty(req.body)) {
      Model.find()
          .then(function(documents) {
            resolve(documents);
          })
          .catch(function() {
            reject(404);
          });
    } else {
      Model.find(req.body)
          .then(function(documents) {
            resolve(documents.toJSON());
          })
          .catch(function() {
            reject(404);
          });
    }
  });
};

exports.post = function(connection, req) {
  const Model = require(`../models/mongodb/${req.params.model}.js`);
  return new Promise(function(resolve, reject) {
    if (req.body[config.database.pass_name] != undefined) {
      encrypt(req.body[config.database.pass_name],
          function(password) {
            req.body[config.database.pass_name] = password;
            const Document = new Model(req.body);
            Document.save()
                .then(function() {
                  resolve(201);
                })
                .catch(function() {
                  reject(409);
                });
          });
    } else {
      const Document = new Model(req.body);
      Document.save()
          .then(function() {
            resolve(201);
          })
          .catch(function() {
            reject(409);
          });
    }
  });
};

exports.put = function(connection, req) {
  const Model = require(`../models/mongodb/${req.params.model}.js`);
  return new Promise(function(resolve, reject) {
    // Encrypt the password if it exists
    if (req.body[config.database.pass_name]) {
      encrypt(req.body[config.database.pass_name],
          function(password) {
            req.body[config.database.pass_name] = password;
            Model.findByIdAndUpdate(req.params.id, req.body)
                .then(function() {
                  resolve(1);
                })
                .catch(function() {
                  reject(404);
                });
          });
    } else {
      Model.findByIdAndUpdate(req.params.id, req.body)
          .then(function() {
            resolve(1);
          })
          .catch(function() {
            reject(404);
          });
    }
  });
};

exports.delete = function(connection, req) {
  const Model = require(`../models/mongodb/${req.params.model}.js`);
  return new Promise(function(resolve, reject) {
    Model.findByIdAndDelete(req.params.id)
        .then(function(doc) {
          if (isEmpty(doc)) resolve(0);
          else resolve(1);
        })
        .catch(function() {
          reject(404);
        });
  });
};

exports.auth = function(connection, req) {
  const Model = require(`../models/mongodb/${req.params.model}.js`);
  return new Promise(function(resolve, reject) {
    Model.findOne({
      [config.database.auth_method]: req.body[config.database.auth_method],
    })
        .then((user) => {
        // Authenticate the password
          bcrypt.compare(
              req.body[config.database.pass_name],
              user[config.database.pass_name],
              function(err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                  resolve(user.toJSON());
                } else {
                  reject(401);
                }
              });
        })
        .catch(reject);
  });
};
