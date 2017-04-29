var slogger = require('../index').init({level:'warn'});

slogger.debug('debug');
slogger.info('info');
slogger.trace('trace');
slogger.warn('warn');
slogger.error('error');
