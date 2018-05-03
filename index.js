var provideFactory = require('./lib/provider_factory');
var config = require('./lib/config');
const TIME_LEVEL_VALUE = config.TIME_LEVEL_VALUE;
const TRACE_LEVEL_VALUE = config.TRACE_LEVEL_VALUE;
const DEBUG_LEVEL_VALUE = config.DEBUG_LEVEL_VALUE;
const INFO_LEVEL_VALUE = config.INFO_LEVEL_VALUE;
const WARN_LEVEL_VALUE = config.WARN_LEVEL_VALUE;
const ERROR_LEVEL_VALUE = config.ERROR_LEVEL_VALUE;
const LOG_LEVEL_MAP = config.LOG_LEVEL_MAP;
/**
 * The slogger object.
 */
var slogger = {
    config : config,
    /**
     * Init slogger
     * 
     * @param {Object=} options
     * @param {Object=} options.debugLogger The debug logger, if empty, it will use console.
     * @param {Object=} options.traceLogger The trace logger, if empty, it will use console.
     * @param {Object=} options.warnLogger The warn logger, if empty, it will use console.
     * @param {Object=} options.errorLogger The error logger, if empty, it will use console.
     * @param {Boolean=} options.disableCustomConsole Whether disable custom console format, if you use third party logger , the param will been ignored.
     * @param {String=} options.logProvider The console logger provider, it can be `log4js` `winston` or `console`, the default value is `console`.
     * @param {String=} otpions.level The level of logger, it can be `time` `trace` `debug` `warn`  `error`,the default is `time`.
     * @param {Boolean=} options.disableTimePrefix Whether disable the time perfix, it only takes effect when you use custom console format.
     * @param {Number=} options.flushInterval  Print the log to console in a fixed time, all logs between the interval will be cached, and then flush to console when the internal timer trigger.it only takes effect when you use custom console format.
     * @returns this
     */
    init:function(options) {
        options = options || {};
        this.debugLogger = options.debugLogger;
        this.traceLogger = options.traceLogger;
        this.errorLogger = options.errorLogger;
        this.disableCustomConsole = options.disableCustomConsole || false;

        var logProvider = options.logProvider || 'console';
        var levelDescription = options.level || 'time';
        var levelOjb = LOG_LEVEL_MAP[levelDescription];
        if (!levelOjb || isNaN(levelOjb.value)) {
            this.level = TIME_LEVEL_VALUE;
            levelDescription = 'time';
        } else {
            this.level = levelOjb.value;
        }
        this.logProviderInstance = provideFactory.getIntance(logProvider,levelDescription,options);
        this._init = true;
        // process.stderr.write(new Date().toLocaleString() + ' - init slogger,is tty:'+process.stdout.isTTY);
        return this;
    },
    print : function(args,level) {
        if (!this._init) {
            this.init();
        }
        level = (level || 'info').toLowerCase();
        if (this.logProviderInstance) {
            const len = args.length;
            const argsArray = new Array(len);
            for (var i=0;i<len;i++) {
                argsArray[i] = args[i];
            }
            return this.logProviderInstance.print(argsArray,level);
        }
        
    },
    debug : function() {
        if (this.level < DEBUG_LEVEL_VALUE) {
            return;
        }
        var debugLogger = this.debugLogger;
        if (debugLogger) {
            debugLogger.debug.apply(debugLogger,arguments);
        } else {
            this.print(arguments, 'DEBUG');
        }
    },
    info : function() {
        if (this.level < INFO_LEVEL_VALUE) {
            return;
        }
        var debugLogger = this.debugLogger;
        if (debugLogger) {
            debugLogger.debug.apply(debugLogger,arguments);
        } else {
            this.print(arguments, 'INFO');
        }
    },
    trace : function() {
        if (this.level < TRACE_LEVEL_VALUE) {
            return;
        }
        var traceLogger = this.traceLogger;
        if (traceLogger) {
            traceLogger.trace.apply(traceLogger,arguments);
        } else {
            this.print(arguments, 'TRACE');
        }       
    },
    warn : function() {
        if (this.level < WARN_LEVEL_VALUE) {
            return;
        }
        var errorLogger = this.errorLogger;
        if (errorLogger) {
            errorLogger.warn.apply(errorLogger,arguments);
        } else {
            this.print(arguments, 'WARN');
        }
        
    },
    error : function() {
        if (this.level < ERROR_LEVEL_VALUE) {
            return;
        }
        var errorLogger = this.errorLogger;
        if (errorLogger) {
            errorLogger.error.apply(errorLogger,arguments);
        } else {
            this.print(arguments, 'ERROR');
        }
        
    },
    time : function(label) {
        if (this.level < TIME_LEVEL_VALUE) {
            return;
        }
        console.time(label);
    },
    timeEnd : function(label) {
        if (this.level < TIME_LEVEL_VALUE) {
            return;
        }
        console.timeEnd(label);
    }
};



module.exports = slogger;