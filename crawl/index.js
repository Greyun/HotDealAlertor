const http = require('http');
const config = require('./config');

const req = function(host, callback) {
  let options = {
    host: host,
    path: getPath(host)
  };
  let r = http.request(options, function(res) {
    var body = '';
    res.on('data', function(data) {
      body += data;
    });

    res.on('end', function(){
      callback(body);
    });
  });
  r.end();
};

const getHosts = () => config.map(obj => obj.host);

const getPath = (host) => {
  let temp = config.find(obj => obj.host === host)
  return temp ? temp.path : undefined;
};

const getRule = (host) => {
  let temp = config.find(obj => obj.host === host)
  return temp ? temp.rule : undefined;
};

module.exports = {req, getHosts, getRule};
