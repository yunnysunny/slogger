var slogger = require('../index').init({disableCustomConsole:true});

slogger.debug('debug');
slogger.info('info');
slogger.trace('trace');
slogger.warn('warn');
slogger.error('error');
