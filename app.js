module.exports = function(sequelize, Sequelize) {
  const express = require('express');
  const app = express();
  const fs = require('fs');
  const cors = require('cors');
  app.use(cors());
  app.use(express.json());
  // Gets the models list
  app.get('/', function(req, res) {
    fs.readdir('models', (err, files) => {
      if (err) console.error(err);
      res.body = {
        type: 'databases',
      };
      for (file in files) {
        if (files.hasOwnProperty(file)) {
          files[file] = files[file].split('.')[0];
        }
      }
      res.body.content = files;
      res.send(res.body);
    });
  });
  app.get('/:model/', function(req, res) {
    try {
      const Model = require(`./models/${req.params.model}.js`)(sequelize,
          Sequelize);
      Model.findAll().then((users) => {
        res.send(users);
      });
    } catch (err) {
      res.sendStatus(404);
    }
  });
  app.post('/:model/', function(req, res) {
    const Model = require(`./models/${req.params.model}.js`)(sequelize,
        Sequelize);
    Model.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    }).then((Model) => {
      res.sendStatus(201);
    }).catch((err) => {
      res.sendStatus(409);
    });
  });
  app.put('/:model/:id', function(req, res) {
    const Model = require(`./models/${req.params.model}.js`)(sequelize,
        Sequelize);
    options = {};
    options.where = {
      id: req.params.id,
    };
    console.log(req.body);

    model = Model.update(req.body, options).then((Model) => res.send(model))
        .catch((err) => res.sendStatus(404));
  });
  app.delete('/:model/:id', function(req, res) {
    const Model = require(`./models/${req.params.model}.js`)(sequelize,
        Sequelize);
    console.log('Request Body: ' + req.body);
    options = {};
    options.where = {
      id: req.params.id,
    };
    Model.destroy(options).then(res.sendStatus(200));
  });
  return app;
};
