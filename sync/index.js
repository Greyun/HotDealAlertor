const fs = require('fs');

const get = function(path, callback) {
  fs.readFile(path, 'utf8', callback);
};

const set = function(path, href, callback) {
  fs.writeFile(path, href, 'utf8', callback);
};

module.exports = {get, set};
