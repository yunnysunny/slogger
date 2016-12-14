var _unshift = Array.prototype.unshift;
var _push = Array.prototype.push;
const MAP_LOG_LEVEL = {
    DEBUG : {color : '\x1b[32m'},
    INFO : {color : '\x1b[32m'},
    TRACE : {color : '\x1b[34m'},
    WARN : {color : '\x1b[33m'},
    ERROR : {color : '\x1b[31m'}
};

var slogger = {

    /**
     * Init slogger
     * 
     * @param {debugLogger,traceLogger,errorLogger,disableCustomConsole} options
     * @returns this
     */
    init:function(options) {
        this.debugLogger = options.debugLogger;
        this.traceLogger = options.traceLogger;
        this.errorLogger = options.errorLogger;
        this.disableCustomConsole = options.disableCustomConsole || false;
        return this;
    },
    print : function(args,level) {
        if (this.disableCustomConsole) {
            level = (level || '').toLowerCase();
            var _fun;
            if (level === 'trace') {
                _fun = console.info;
            } else {
                _fun  = console[level.toLowerCase()] || console.info;
            }
            return _fun.apply(console, args);
        }
        level = (level || '').toUpperCase();
        var config = MAP_LOG_LEVEL[level] || {color : ''};
        _unshift.call(args, config.color + new Date().toString() + ' ['+level+']');
        _push.call(args,'\x1b[0m');
        console.info.apply(console, args);
    },
    debug : function() {
        var debugLogger = this.debugLogger;
        if (debugLogger) {
            debugLogger.debug.apply(debugLogger,arguments);
        } else {
            this.print(arguments, 'DEBUG');
        }
    },
    info : function() {
        var debugLogger = this.debugLogger;
        if (debugLogger) {
            debugLogger.debug.apply(debugLogger,arguments);
        } else {
            this.print(arguments, 'INFO');
        }
    },
    trace : function() {
        var traceLogger = this.traceLogger;
        if (traceLogger) {
            traceLogger.trace.apply(traceLogger,arguments);
        } else {
            this.print(arguments, 'TRACE');
        }       
    },
    warn : function() {
        var errorLogger = this.errorLogger;
        if (errorLogger) {
            errorLogger.warn.apply(errorLogger,arguments);
        } else {
            this.print(arguments, 'WARN');
        }
        
    },
    error : function() {
        var errorLogger = this.errorLogger;
        if (errorLogger) {
            errorLogger.error.apply(errorLogger,arguments);
        } else {
            this.print(arguments, 'ERROR');
        }
        
    }
};

module.exports = slogger;