var slogger = {

    /**
     * Init slogger
     * 
     * @param {debugLogger,traceLogger,errorLogger} options
     * @returns this
     */
    init:function(options) {
        this.debugLogger = options.debugLogger;
        this.traceLogger = options.traceLogger;
        this.errorLogger = options.errorLogger;
        return this;
    },
    debug : function() {
        var debugLogger = this.debugLogger;
        if (debugLogger) {
            debugLogger.debug.apply(debugLogger,arguments);
        }
    },
    trace : function() {
        var traceLogger = this.traceLogger;
        if (traceLogger) {
            traceLogger.trace.apply(traceLogger,arguments);
        }        
    },
    warn : function() {
        var errorLogger = this.errorLogger;
        if (errorLogger) {
            errorLogger.warn.apply(errorLogger,arguments);
        }
        
    },
    error : function() {
        var errorLogger = this.errorLogger;
        if (errorLogger) {
            errorLogger.error.apply(errorLogger,arguments);
        }
        
    }
};

module.exports = slogger;