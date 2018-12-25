exports.getType = function(config) {
  if ([
    'postgres',
    'mssql',
    'sqlite',
    'mysql',
  ].includes(config.database.dialect)) {
    return 'sql';
  }
};
