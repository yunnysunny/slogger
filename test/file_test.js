const path = require('path');
var slogger = require('../index');

slogger.init({
    flushInterval:2000,
    logFiles:[
        {category:'warn',filename:path.join(__dirname , './log/warn.log')}
    ]
});
for (var i=0;i<100;i++) {
    slogger.warn(i);
}
