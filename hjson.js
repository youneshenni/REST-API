const fs = require('fs');
fs.writeFileSync('./config.json', JSON.stringify(
    require('hjson').parse(fs.readFileSync('./config.hjson', 'ASCII'))));
