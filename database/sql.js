const Sequelize = require('sequelize');
const config = require('../config');
const getType = require('../functions.js').getType;
exports.init = function connect(config, callback) {
  /**
   * This function establishes a connection and calls a callback it is given
   * @param {Object} config Configuration object
   * @param {function} callback Callback Function
   */
  const Prompt = require('prompt-password');
  const prompt = new Prompt(config.password);
  const database = config.database;
  const db = config.db;

  db.dialect = database.dialect;
  db.host = database.host;
  if (database.dialect == 'sqlite') db.storage = database.path;
  prompt.run()
      .then(function(answers) {
        database.password = answers;
        const sequelize = new Sequelize(
            database.database,
            database.username,
            database.password, db);
        sequelize.authenticate().then(() => {
          sequelize.authenticate()
              .then(() => {
                console.log('Connection to Database established');
                callback(sequelize).listen(config.server.port);
              })
              .catch((err) => {
                console.error('Unable to connect to the database:', err);
              });
        });
      });
};

exports.get = function(sequelize, req) {
  return new Promise(function(resolve, reject) {
    const Model = require(
        `../models/${getType(config)}/${req.params.model}.js`
    )(sequelize,
        Sequelize);
    Model.findAll().then((users) => {
      resolve(users);
    }).catch((err) => reject(404));
  });
};

exports.post = function(sequelize, req) {
  return new Promise(function(resolve, reject) {
    const Model = require(
        `../models/${getType(config)}/${req.params.model}.js`
    )(sequelize,
        Sequelize);
    Model.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    }).then((Model) => {
      resolve(201);
    }).catch((err) => {
      reject(409);
    });
  });
};

exports.put = function(sequelize, req) {
  return new Promise(function(resolve, reject) {
    const Model = require(
        `../models/${getType(config)}/${req.params.model}.js`
    )(sequelize,
        Sequelize);
    options = {};
    options.where = {
      id: req.params.id,
    };

    Model.update(req.body, options)
        .then((count) => resolve(count))
        .catch((err) => reject(404));
  });
};

exports.delete = function(sequelize, req) {
  return new Promise(function(resolve, reject) {
    const Model = require(
        `../models/${getType(config)}/${req.params.model}.js`
    )(sequelize, Sequelize);
    options = {};
    options.where = {
      id: req.params.id,
    };
    Model.destroy(options)
        .then((count) => resolve(count))
        .catch((err) => reject(404));
  });
};
