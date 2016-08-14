# node-slogger
A wrapper of logger package , which can write same code even if you change you logger api.
## Install
```npm install node-slogger```
## How to use
To show the usage of node-slogger, we choose [log4js](https://www.npmjs.com/package/log4js) for our logger instance.
```js
var slogger = require('node-slogger');
var log4js = require('log4js');

var log4jsConfig = require('./log4js.json');
log4js.configure(log4jsConfig);

slogger.init({
    debugLogger:log4js.getLogger('debug'),
    traceLogger:log4js.getLogger('trace'),
    errorLogger:log4js.getLogger('error')
});

slogger.debug('debug');//use debugLogger to call debug
slogger.trace('trace');//use traceLogger to call trace
slogger.warn('warn');//use errorLogger to call warn
slogger.error('error');//use errorLogger to call error
```
