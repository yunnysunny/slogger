var slogger = require('../index');
slogger.init({
    logProvider:'winston'
});

slogger.debug('debug',{a:1,b:2});
slogger.trace('This is a trace');
slogger.warn('This is a warn');
slogger.error('This is a error');
