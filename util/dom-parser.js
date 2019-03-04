const parser = require('node-html-parser');

module.exports = {
  parse: function(html) {
    return parser.parse(html);
  }
};
