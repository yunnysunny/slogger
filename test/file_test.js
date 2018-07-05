const path = require('path');
var slogger = require('../index');

slogger.init({
    logFiles:[
        {category:'warn',filename:path.join(__dirname , './log/warn.log')}
    ]
});

slogger.warn('first');