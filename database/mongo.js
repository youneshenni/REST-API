const mongoose = require('mongoose');
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
    Model.find()
        .then(function(documents) {
          resolve(documents);
        })
        .catch(function() {
          reject(404);
        });
  });
};

exports.post = function(connection, req) {
  const Model = require(`../models/mongodb/${req.params.model}.js`);
  return new Promise(function(resolve, reject) {
    const Document = new Model(req.body);
    Document.save()
        .then(function() {
          resolve(201);
        })
        .catch(function() {
          reject(409);
        });
  });
};

exports.put = function(connection, req) {
  const Model = require(`../models/mongodb/${req.params.model}.js`);
  return new Promise(function(resolve, reject) {
    Model.findByIdAndUpdate(req.params.id, req.body)
        .then(function() {
          resolve(1);
        })
        .catch(function() {
          reject(404);
        });
  });
};

exports.delete = function(connection, req) {
  const Model = require(`../models/mongodb/${req.params.model}.js`);
  return new Promise(function(resolve, reject) {
    Model.findByIdAndDelete(req.params.id)
        .then(function() {
          resolve(1);
        })
        .catch(function() {
          reject(404);
        });
  });
};
