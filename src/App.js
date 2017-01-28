const Scamp = require('./Scamp.js');
const path = require('path');

Scamp.load(path.join(__dirname, 'scripts'));

Scamp.listen();
