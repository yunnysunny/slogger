const util = require('util');
const config = require('../config');
// var _unshift = Array.prototype.unshift;
// var _push = Array.prototype.push;
const LOG_LEVEL_MAP = config.LOG_LEVEL_MAP;
const NEW_LINE_SEPARATOR = require('os').EOL;
var LOG_CACHE = '';

function flushLog(interval) {
    setTimeout(function flushTimeout() {
        if (LOG_CACHE) {
            console.info(LOG_CACHE);
            LOG_CACHE = '';
        }
        
        flushLog(interval);
    },interval);
}

function addToCache(args) {
    LOG_CACHE += util.format.apply(null,args) + NEW_LINE_SEPARATOR;
}

module.exports = function(level,options) {
    var disableCustomConsole = options.disableCustomConsole;
    var disableTimePrefix = options.disableTimePrefix;
    var flushInterval = options.flushInterval;
    if (flushInterval) {
        flushLog(flushInterval);
    }
    return {
        print : function(args,level) {
            if (disableCustomConsole) {
                var _fun;
                if (level === 'trace') {
                    _fun = console.info;
                } else {
                    _fun  = console[level] || console.info;
                }
                return _fun.apply(console, args);
            }

            var config = LOG_LEVEL_MAP[level] || {color : ''};
            var prefix = config.color;
            if (!disableTimePrefix) {
                prefix += new Date().toString();
            }
            args.unshift( prefix  + ' ['+level.toUpperCase()+']');
            args.push('\x1b[0m');
            if (flushInterval) {
                return addToCache(args);
            }
            console.info.apply(console, args);
        }
    };
}