// const util = require('util');
const config = require('../config');
// const format = util.format;
const LOG_LEVEL_MAP = config.LOG_LEVEL_MAP;
const NEW_LINE_SEPARATOR = require('os').EOL;
var LOG_CACHE = '';

/**
 * Format the Date to a string.
 * 
 * @param {Date} date 
 */
function dateFormat(date) {
    return date.getFullYear()+'-' + (date.getMonth() + 1) + '-'+date.getDate() + ' '+date.getHours()+':'+date.getMinutes() + ':'+date.getSeconds();
}

function myFormat(params) {
    var str = '';
    if (!params) {
        return str;
    }
    var element;
    for (var i=0,len=params.length;i<len;i++) {
        element = params[i];
        if (element instanceof Error) {
            str += ' ' + element.stack + NEW_LINE_SEPARATOR;
        } else if (typeof(element) === 'object') {
            str += ' ' + JSON.stringify(element);
        } else {
            str += ' ' + element;
        }
    }
    return str;
}

function flushLog(interval) {
    setTimeout(function flushTimeout() {
        if (LOG_CACHE) {
            console.info(LOG_CACHE);
            LOG_CACHE = '';
        }
        
        flushLog(interval);
    },interval);
}

// function addToCache(args) {
//     LOG_CACHE += format.apply(null,args) + NEW_LINE_SEPARATOR;
// }

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
                prefix += dateFormat(new Date());
            }
            prefix += ' ['+level.toUpperCase()+'] \x1b[0m';
            var len = args.length;
            const params = new Array(len+1);
            params[0] = prefix;
            for (var i=1;i<=len;i++) {
                params[i] = args[i-1];
            }

            if (flushInterval) {
                LOG_CACHE += myFormat(params) + NEW_LINE_SEPARATOR;
                return;
            }
            console.info.apply(console, params);
        }
    };
}