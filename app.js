module.exports = function(database) {
  const express = require('express');
  const app = express();
  const fs = require('fs');
  const cors = require('cors');
  const jwtMiddleware = require('express-jwt-middleware');
  const jwtCheck = jwtMiddleware('secret');
  const config = require('./config.json');
  const getType = require('./functions.js').getType;
  const auth = require('./functions.js').auth;
  const db = require(`./database/${getType(config)}`);

  app.use(cors());

  app.use(express.json());


  app.post('/:model/auth', function(req, res) {
    db.auth(database, req)
        .then((user) => {
          res.send(auth(user));
        })
        .catch();
  });

  // Gets the models list
  app.get('/', jwtCheck, function(req, res) {
    fs.readdir(`models/${getType(config)}`, (err, files) => {
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

  app.get('/:model/', jwtCheck, function(req, res) {
    db.get(database, req)
        .then((status) => res.send(status))
        .catch((status) => res.sendStatus(status));
  });

  app.post('/:model/', jwtCheck, function(req, res) {
    db.post(database, req)
        .then((status) => res.sendStatus(status))
        .catch((status) => res.sendStatus(status));
  });

  app.put('/:model/:id', jwtCheck, function(req, res) {
    db.put(database, req)
        .then((model) => {
          let count = model[0];
          if (count === 0) count = 404;
          else count = 200;
          res.sendStatus(count);
        })
        .catch((status) => res.sendStatus(status));
  });

  app.delete('/:model/:id', jwtCheck, function(req, res) {
    db.delete(database, req)
        .then((count) => {
          if (count === 0) count = 404;
          else count = 200;
          res.sendStatus(count);
        })
        .catch((status) => res.sendStatus(status));
  });
  return app;
};
