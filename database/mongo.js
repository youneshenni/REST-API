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
            `mongoose://${config.database.username}:` +
                `${answers}@${config.database.host}:` +
                `${config.database.port}/${config.database.db_name}`
        );
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
          console.log('Connection to Database successfully established');
          callback(db).listen(config.server.port);
        });
      });
};
