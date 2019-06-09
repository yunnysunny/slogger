var LogPrinter = require('./lib/LogPrinter');
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
     * @param {String=}  [otpions.level=time]  The level of logger, it can be `time` `trace` `debug` `warn`  `error`,the default is `time`.
     * @param {Number=}  [options.flushInterval=0]  Print the log to console in a fixed time, all logs between the interval will be cached, and then flush to console when the internal timer trigger.it only takes effect when you use custom console format.
     * @param {LogFileItem[]}  [options.logFiles=undefined] The files to storage the log.
     * @param {LogstashItem[]} [options.logstashes=undefined] The logstash server config.
     * @param {Boolean} [options.disableTimePrefix=false] Whether disable the time perfix.
     * @param {String=} [options.projectName=''] The name of project which use slogger, it will be a field of data sent to logstash if you use.
     * @returns this
     */
    init:function(options) {
        options = options || {};

        var levelDescription = options.level || 'time';
        var levelOjb = LOG_LEVEL_MAP[levelDescription];
        if (!levelOjb || isNaN(levelOjb.value)) {
            this.level = TIME_LEVEL_VALUE;
            levelDescription = 'time';
        } else {
            this.level = levelOjb.value;
        }
        this._printer = new LogPrinter(options);
        this._init = true;
        // process.stderr.write(new Date().toLocaleString() + ' - init slogger,is tty:'+process.stdout.isTTY);
        return this;
    },
    print : function(args,level) {
        if (!this._init) {
            this.init();
        }
        if (Array.isArray(args)) {
            return this._printer.print(args,level);
        }
        const len = args.length;
        const argsArray = new Array(len);
        for (var i=0;i<len;i++) {
            argsArray[i] = args[i];
        }
        return this._printer.print(argsArray,level);
    },
    debug : function() {
        if (this.level < DEBUG_LEVEL_VALUE) {
            return;
        }

        this.print(arguments, 'debug');
    },
    info : function() {
        if (this.level < INFO_LEVEL_VALUE) {
            return;
        }
        
        this.print(arguments, 'info');
    },
    trace : function() {
        if (this.level < TRACE_LEVEL_VALUE) {
            return;
        }
        
        this.print(arguments, 'trace');
    },
    warn : function() {
        if (this.level < WARN_LEVEL_VALUE) {
            return;
        }
        
        this.print(arguments, 'warn');
    },
    error : function() {
        if (this.level < ERROR_LEVEL_VALUE) {
            return;
        }
        
        this.print(arguments, 'error');
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