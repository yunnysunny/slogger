var config = require('../config');
// var _unshift = Array.prototype.unshift;
// var _push = Array.prototype.push;
const LOG_LEVEL_MAP = config.LOG_LEVEL_MAP;

module.exports = function(level,options) {
    var disableCustomConsole = options.disableCustomConsole;
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
            args.unshift(config.color + new Date().toString() + ' ['+level.toUpperCase()+']');
            args.push('\x1b[0m');
            console.info.apply(console, args);
        }
    };
}