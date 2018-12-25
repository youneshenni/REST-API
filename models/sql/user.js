module.exports = function(sequelize, Sequelize) {
  const User = sequelize.define('user', {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
  });

  User.sync({
    force: false,
  });
  return User;
};
