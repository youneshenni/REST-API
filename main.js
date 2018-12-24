const Prompt = require('prompt-password');
const prompt = new Prompt(require('./config.json').password);
const Sequelize = require('sequelize');
const server = require('./config.json').server;
const database = require('./config.json').database;
const db = require('./config.json').db;

db.dialect = database.dialect;
db.host = database.host;
if (database.database == 'sqlite') db.storage = database.path;
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
              // Connection successful
              const app = require('./app.js')(sequelize, Sequelize);
              app.listen(server.port);
            })
            .catch((err) => {
              console.error('Unable to connect to the database:', err);
            });
      });
    });
