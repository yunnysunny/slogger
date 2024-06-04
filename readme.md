# node-slogger

[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]

[npm-url]: https://npmjs.org/package/slogger
[travis-image]: https://img.shields.io/travis/yunnysunny/slogger.svg?style=flat-square
[travis-url]: https://travis-ci.org/yunnysunny/slogger
[coveralls-image]: https://img.shields.io/coveralls/yunnysunny/slogger.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/yunnysunny/slogger?branch=master
[david-image]: https://img.shields.io/david/yunnysunny/slogger.svg?style=flat-square
[david-url]: https://david-dm.org/yunnysunny/slogger
[node-image]: https://img.shields.io/badge/node.js-%3E=_6-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/

[![NPM](https://nodei.co/npm/node-slogger.png?downloads=true)](https://nodei.co/npm/node-slogger/)  
A wrapper of logger package , let you wirte log easy.

## Install
```npm install node-slogger```

## How to use

### The fist demo

The slogger t will print log to console with prefix of time string and log level,
for example `slogger.debug('debug')` will print `Thu Dec 15 2016 11:04:50 GMT+0800 (CST) [DEBUG] debug` . Different function will be printed with different color.

```javascript
const {Slogger} = require('node-slogger');
var slogger = new Slogger();

slogger.debug('debug');
slogger.info('info');
slogger.trace('trace');
slogger.warn('warn');
slogger.error('error');
```

### Saving log to file

```javascript
const path = require('path');
const fs = require('fs')
const {Slogger, LogLevel} = require('node-slogger');

const slogger = new Slogger({
    streams:{
	    [LogLevel.ERROR]: fs.createWriteStream(path.join(__dirname , './log/error.log'))
    }
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
const {Slogger} = require('node-slogger');
const slogger = new Slogger({flushInterval:500});
slogger.debug('this is a delay log');//it will show after 500ms
```

### Setting the log level
You can set the level of log , just use the option of `level`. For example we set it to `warn`:

```javascript
const {Slogger} = require('node-slogger');
const slogger = new Slogger({level:'warn');

slogger.debug('debug');
slogger.info('info');
slogger.trace('trace');
slogger.warn('warn');
slogger.error('error');
```
**The code of level_test.js**  
Only the `warn` adn `error` log will be printed as we set the `level` option to `warn`.

## API
See the document of [api](docs/index.md).

## Known issues

### 1. Not showing log on VS Code's debug panel

You should modify the `launch.json` and add the parameter `outputCapture` with the value `std` and parameter `console` with `internalConsole`. This is an example:

```json
{
    "type": "node",
    "request": "launch",
    "name": "Mocha Tests",
    "program": "${workspaceFolder}/node_modules/mocha/bin/_mocha",
    "args": [
        "-u",
        "tdd",
        "--timeout",
        "999999",
        "--colors",
        "${workspaceFolder}/src/test/mocha"
    ],
    "console": "internalConsole",
    "outputCapture": "std",
    "internalConsoleOptions": "openOnSessionStart"
},
```
## Breaking changes on 3.x

1. Singleton object are no longer the default exported and must be manually created based on the exported slogger class.

```JavaScript
// code in 2.x and below
const slogger = require('node-slogger').init({});
```

```JavaScript
// code in 3.x
const { Slogger } = require('node-slogger');
const slogger = new Slogger();
```
2. Support for input file objects has been removed. Now, it is required to use a writeable stream instead.

```JavaScript
// code in 2.x and below
const path = require('path');
const slogger = require('node-slogger').init({
    logFiles:[
        {category:'error',filename:path.join(__dirname , './log/error.log')}
    ]
});
```

```JavaScript
// code in 3.x
const { Slogger } = require('node-slogger');
const fs = require('fs');
const slogger = new Slogger({
    streams:{
      [LogLevel.ERROR]: fs.createWriteStream(path.join(__dirname , './log/error.log'))
    }
});
```
3. Useless Kafka feature support has been removed.
## License

[MIT](LICENSE)