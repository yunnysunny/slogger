# node-slogger
[![NPM](https://nodei.co/npm/node-slogger.png?downloads=true)](https://nodei.co/npm/node-slogger/)  
A wrapper of logger package , which can write same code even if you change you logger library.

## Install
```npm install node-slogger```

## How to use

### Without any log library

The slogger can work properly , even though you use none log libraries.
It will print log to console with prefix of time string and log level,
for example `slogger.debug('debug')` will print `Thu Dec 15 2016 11:04:50 GMT+0800 (CST) [DEBUG] debug` . Different function will be printed with different color.

```javascript
var slogger = require('../index');

slogger.debug('debug');
slogger.info('info');
slogger.trace('trace');
slogger.warn('warn');
slogger.error('error');
```

But if you want print without the custom format, you can pass paramater `disableCustomConsole` to `init`,
and set its value `true`.

### Saving log to file
And then we choose [log4js](https://www.npmjs.com/package/log4js) to save our logs to files.
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


slogger.debug('debug');//use debugLogger to call debug
slogger.info('info');//use debugLogger to call info
slogger.trace('trace');//use traceLogger to call trace
slogger.warn('warn');//use errorLogger to call warn
slogger.error('error');//use errorLogger to call error
```
**The code of log4js_test.js**

```json
{
    "appenders": [
        {"type": "console"},
        {"type": "dateFile", "filename": "log/debug.log", "pattern": "-yyyy-MM-dd", "backups": 10, "category": "debug"}, 
        {"type": "dateFile", "filename": "log/trace.log", "pattern": "-yyyy-MM-dd", "category": "trace"},
        {"type": "file", "filename": "log/error.log", "maxLogSize": 1024000, "backups": 10, "category": "error"}
    ],
    "replaceConsole": true
}
```
**The code of log4js.son**

### Printing log to console with third party log libraries

If you don't want to save log to files, and only want get a pretty log printed via third log libraries, you can pass the option of `logProvider` to the `init` function.

```javascript
var slogger = require('../index');
slogger.init({
    logProvider:'winston'
});

slogger.debug('debug',{a:1,b:2});
slogger.trace('This is a trace');
slogger.warn('This is a warn');
slogger.error('This is a error');
```
**The code of winston_test.js**

We set `logProvider`'s value to `winston`, you can also set it to `log4js` if you like. The default of the `logProvider` is console.

### Printing the log to console delayed with fixed interval.

If you wanna you project run with high performance, printing to console frequently will cost a lot of cpu time. So slogger provide a feature of printing log in delay time with a fixed interval. But it only run in custom mode, in other words, if you set `disableCustomConsole` true or use third party of log library, you can't use the delay feature.

```javascript
var slogger = require('../index');
slogger.init({flushInterval:500});
slogger.debug('this is a delay log');//it will show after 500ms
```

### Setting the log level
You can set the level of log , just use the option of `level`. For example we set it to `warn`:

```javascript
var slogger = require('../index').init({level:'warn'});

slogger.debug('debug');
slogger.info('info');
slogger.trace('trace');
slogger.warn('warn');
slogger.error('error');
```
**The code of level_test.js**  
Only the `warn` adn `error` log will be printed as we set the `level` option to `warn`.

## API
See the document of [api](doc/api.md).

## License

[MIT](LICENSE)