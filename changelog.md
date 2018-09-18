# 1.0.2
## Fix
1. Fixed the issue of not clearing the cache used to write files.
## Add
1. Add the millisecond of the time string.

# 1.0.1
## Fix
1. Fixed the problem of not supporting the node of v0.x

# 1.0.0
## Remove
1. Discard the support of third-part log library.
2. Remove some unused function.
## Add
1. Add the function of saving log to files.


# 0.5.3
## Remove
1. Discard the call of `toUpperCase`.

# 0.5.2
## Fix
1. Finally resolved the issue of memory leak cased by `console.log`, also see the issue [#1741](https://github.com/nodejs/node/issues/1741) of node.
    
# 0.5.1
## Fix
1. Fix the issue of breaking down when you lack log4js or winston even if you not need it.

# 0.5.0
## Fix
1. Fix the bug of memory leak.

# 0.4.3
## Fix
1. Fix the color not recover problem.

# 0.4.2
## Fix
1. Fixed color not show problem.

# 0.4.1
## Improve
1. Improve the performance of custom console log.

# 0.4.0
## Add
1. Add delay console feature.

# 0.3.0
## Add
1. Improve the performance of the `print` function.

# 0.2.0 
## Add
1. Add `time` `timeEnd` function and the const of `TIME_LEVEL_VALUE`, which is the default level of slogger.

# 0.1.0
## Add
1. Add support of winston.
2. Refactor the code.

# 0.0.3 
## Add
1. Use console to print log if not given the instances of logger.

# 0.0.2
## Fix
1. Check whether the logger object exists before call its function.

# 0.0.1 
## Add
1. Project init.