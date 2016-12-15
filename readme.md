# node-slogger
A wrapper of logger package , which can write same code even if you change you logger api.
## Install
```npm install node-slogger```
## How to use

### With log4js
To show the usage of node-slogger, we choose [log4js](https://www.npmjs.com/package/log4js) for our logger instance.
```javascript
var slogger = require('node-slogger');
var log4js = require('log4js');

var log4jsConfig = require('./log4js.json');
log4js.configure(log4jsConfig);

slogger.init({
    debugLogger:log4js.getLogger('debug'),
    traceLogger:log4js.getLogger('trace'),
    errorLogger:log4js.getLogger('error')
});
// The function `init` can be ignored, when you do so,     
// it will only print log to console, see the [example](https://github.com/yunnysunny/slogger/blob/master/test/test2-1.js).

slogger.debug('debug');//use debugLogger to call debug
slogger.info('info');//use debugLogger to call info
slogger.trace('trace');//use traceLogger to call trace
slogger.warn('warn');//use errorLogger to call warn
slogger.error('error');//use errorLogger to call error
```

### Without any log library

The slogger can work properly , even though you use none log libraries.
It will print log to console with prefix of time string and log level,
for example `slogger.debug('debug')` will print `Thu Dec 15 2016 11:04:50 GMT+0800 (CST) [DEBUG] debug` .

```javascript
var slogger = require('../index');

slogger.debug('debug');
slogger.info('info');
slogger.trace('trace');
slogger.warn('warn');
slogger.error('error');
```

### Disable the custom prefix

When you not pass  paramater `debugLogger` `traceLogger` `errorLogger` to the function `init`,
it will print the log with custom prefix, which has mentioned  before.
But if you want print without the prefix, you can pass paramater `disableCustomConsole` to `init`,
and set its value `true`, see the [example](https://github.com/yunnysunny/slogger/blob/master/test/test2-2.js).
