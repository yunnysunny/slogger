
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
        debugLogger.debug.apply(debugLogger,arguments);
    },
    trace : function() {
        traceLogger.trace.apply(traceLogger,arguments);
    },
    warn : function() {
        errorLogger.warn.apply(errorLogger,arguments);
    },
    error : function() {
        errorLogger.error.apply(errorLogger,arguments);
    }
};

module.exports = slogger;