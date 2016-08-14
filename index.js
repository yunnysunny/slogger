
var debugLogger;
var traceLogger;
var errorLogger;
var slogger = {

    /**
     * Init slogger
     * 
     * @param {debugLogger,traceLogger,errorLogger} options
     * @returns this
     */
    init:function(options) {
        debugLogger = options.debugLogger;
        traceLogger = options.traceLogger;
        errorLogger = options.errorLogger;
        return this;
    },
    debug : function() {
        if (debugLogger) {
            debugLogger.debug.apply(debugLogger,arguments);
        }
    },
    trace : function() {
        if (traceLogger) {
            traceLogger.trace.apply(traceLogger,arguments);
        }        
    },
    warn : function() {
        if (errorLogger) {
            errorLogger.warn.apply(errorLogger,arguments);
        }
        
    },
    error : function() {
        if (errorLogger) {
            errorLogger.error.apply(errorLogger,arguments);
        }
        
    }
};

module.exports = slogger;