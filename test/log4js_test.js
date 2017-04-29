var slogger = require('../index');
var log4js = require('log4js');

var log4jsConfig = require('./log4js.json');
log4js.configure(log4jsConfig);

slogger.init({
    debugLogger:log4js.getLogger('debug'),
    //traceLogger:log4js.getLogger('trace'),
    errorLogger:log4js.getLogger('error'),
    disableCustomConsole:true
});

slogger.debug('debug',{a:1,b:2});
slogger.trace('This is a trace');
slogger.warn('warn');
slogger.error('error',new Error('This is a test error.'));
setTimeout(function() {
    slogger.debug('debug2');
    slogger.trace('trace2');
},1000);

