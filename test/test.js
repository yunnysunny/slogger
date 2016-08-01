var slogger = require('../index');
var log4js = require('log4js');

var log4jsConfig = require('./log4js.json');
log4js.configure(log4jsConfig);

slogger.init({
    debugLogger:log4js.getLogger('debug'),
    traceLogger:log4js.getLogger('trace'),
    errorLogger:log4js.getLogger('error')
});

slogger.debug('debug');
slogger.trace('trace');
slogger.warn('warn');
slogger.error('error');
