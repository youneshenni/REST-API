const Sequelize = require('sequelize');
const process = require('process');
const init = function connect(config, callback) {
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
                callback(sequelize);
              })
              .catch((err) => {
                console.error('Unable to connect to the database:', err);
              });
        });
      });
};

init(require('./config.json'), function(sequelize) {
  console.log(process.argv);
  for (let index = 2; index < process.argv.length; index++) {
    require(`./models/sql/${process.argv[index]}`)(
        sequelize,
        Sequelize
    ).sync({
      force: true,
    });
    console.log(`Synchronized ${process.argv[index]}`);
  }
  console.log('Finished synchronizing the database');

  process.exit();
  return User;
});
