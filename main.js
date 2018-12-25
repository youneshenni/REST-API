const config = require('./config.json');
require(`./database/${require('./functions.js')
    .getType(config)}.js`).init(config, require('./app.js'));
