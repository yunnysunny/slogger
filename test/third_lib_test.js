var slogger = require('../index');
var log4js = require('log4js');
var log4jsConfig = {
    "appenders": [
        {"type": "console"},
        {"type": "file", "filename": "debug.log",  "category": "debug"}, 
        {"type": "file", "filename": "trace.log", "category": "trace"},
        {"type": "file", "filename": "error.log",  "category": "error"}
    ],
    "replaceConsole": true
};

describe('third logger library',function() {
    it('winston',function() {
        slogger.init({
            logProvider:'winston'
        });

        slogger.debug('debug',{a:1,b:2});
        slogger.trace('This is a trace');
        slogger.warn('This is a warn');
        slogger.error('This is a error');
    });
    it('log4js',function() {
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
        //slogger.error('error',new Error('This is a test error.'));
        setTimeout(function() {
            slogger.debug('debug2');
            slogger.trace('trace2');
        },1000);
    });
});

