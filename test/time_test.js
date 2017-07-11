var slogger = require('../index');

slogger.time('labelxxx');
for (var i=0;i<20000000;i++) {
    
}
slogger.timeEnd('labelxxx');
slogger.level = slogger.config.INFO_LEVEL_VALUE;
slogger.time('labelyyy');
for (var i=0;i<20000000;i++) {
    
}
slogger.timeEnd('labelyyy');
slogger.info('end');