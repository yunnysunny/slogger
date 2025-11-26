# v3.0.1
## Improve
1. Padding millisecond to 3 length string.
# v3.0.0
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
4. Drop the support for node 12 and below.
## Add

1. The project has been rewritten using TypeScript, which supports both CJS and MJS modules.
2. The tool now supports embedding into a serverless service.

# v2.4.0

## Add
1. Add typescript support.

# v2.3.1

## Fix

1. Rename `disabledLevelPrefix` to `disableLevelPrefix`.

# v2.3.0

## Add

1. Add `disabledLevelPrefix` parameter.

# v2.2.1

## Fix

1. Check the state of stream before writting to fix the issue [#2](https://github.com/yunnysunny/slogger/issues/2).

# v2.2.0
## Add
1. Add the function of `flush` to flush the log content to stdout and files.
 
# v2.1.0
## Add
1. Add the support of writting log to kafka.
## Remove
1. Remove the function of writting log to logstash.

# v2.0.0
## Breaking change
1. Drop the support of node 5 and below.
## Add
1. Add the function of writting log to logstash.

# v1.0.2
## Fix
1. Fixed the issue of not clearing the cache used to write files.
## Add
1. Add the millisecond of the time string.

# v1.0.1
## Fix
1. Fixed the problem of not supporting the node of v0.x

# v1.0.0
## Remove
1. Discard the support of third-part log library.
2. Remove some unused function.
## Add
1. Add the function of saving log to files.


# v0.5.3
## Remove
1. Discard the call of `toUpperCase`.

# v0.5.2
## Fix
1. Finally resolved the issue of memory leak cased by `console.log`, also see the issue [#1741](https://github.com/nodejs/node/issues/1741) of node.
    
# v0.5.1
## Fix
1. Fix the issue of breaking down when you lack log4js or winston even if you not need it.

# v0.5.0
## Fix
1. Fix the bug of memory leak.

# v0.4.3
## Fix
1. Fix the color not recover problem.

# v0.4.2
## Fix
1. Fixed color not show problem.

# v0.4.1
## Improve
1. Improve the performance of custom console log.

# v0.4.0
## Add
1. Add delay console feature.

# v0.3.0
## Add
1. Improve the performance of the `print` function.

# v0.2.0 
## Add
1. Add `time` `timeEnd` function and the const of `TIME_LEVEL_VALUE`, which is the default level of slogger.

# v0.1.0
## Add
1. Add support of winston.
2. Refactor the code.

# v0.0.3 
## Add
1. Use console to print log if not given the instances of logger.

# v0.0.2
## Fix
1. Check whether the logger object exists before call its function.

# v0.0.1 
## Add
1. Project init.