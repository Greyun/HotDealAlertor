const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath:'./logs/alertor.log',
        timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
    },
    log = SimpleNodeLogger.createSimpleLogger( opts );
log.setLevel('debug');

module.exports = log;
