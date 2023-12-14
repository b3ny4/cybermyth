const config = require('./webpack.config.js');

config.mode = 'development';
config.watch = true;
config.devtool = 'inline-source-map';

module.exports = config;