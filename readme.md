# node-slogger
[![NPM](https://nodei.co/npm/node-slogger.png?downloads=true)](https://nodei.co/npm/node-slogger/)  
A wrapper of logger package , let you wirte log easy.

## Install
```npm install node-slogger```

## How to use

### The fist demo

The slogger t will print log to console with prefix of time string and log level,
for example `slogger.debug('debug')` will print `Thu Dec 15 2016 11:04:50 GMT+0800 (CST) [DEBUG] debug` . Different function will be printed with different color.

```javascript
var slogger = require('../index');

slogger.debug('debug');
slogger.info('info');
slogger.trace('trace');
slogger.warn('warn');
slogger.error('error');
```

### Saving log to file

```javascript
const path = require('path');
var slogger = require('../index');

slogger.init({
    logFiles:[
        {category:'error',filename:path.join(__dirname , './log/error.log')}
    ]
});

slogger.debug('debug');//only print to console
slogger.info('info');//only print to console
slogger.trace('trace');//only print to console
slogger.warn('warn');//only print to console
slogger.error('error');//print to console and write to the file
```
**The code of file_test.js**


### Printing the log to console delayed with fixed interval.

If you wanna you project run with high performance, printing to console frequently will cost a lot of cpu time. So slogger provide a feature of printing log in delay time with a fixed interval. 

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