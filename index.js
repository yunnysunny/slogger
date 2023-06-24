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
     * @param {object} [options]
     * @param {string=}  [options.level='time']  The level of logger, it can be `time` `trace` `debug` `warn`  `error`,the default is `time`.
     * @param {Number=}  [options.flushInterval=0]  Print the log to console in a fixed time, all logs between the interval will be cached, and then flush to console when the internal timer trigger.it only takes effect when you use custom console format.
     * @param {LogFileItem[]}  [options.logFiles] The files to storage the log.
     * @param {QueueScheduleProducer[]} [options.producers] The instances of QueueScheduleProducer, which used to send log to kafka.
     * @param {Boolean} [options.disableTimePrefix=false] Whether disable the time perfix.
     * @param {Boolean=} [options.disableLevelPrefix=false] Whether disble the level string prefix.
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
    /**
     * Print log with given level
     *
     * @param {String} level 
     * @param {Array} args 
     */
    print : function(level, ...args) {
        if (!this._init) {
            this.init();
        }
        return this._printer.print(args,level);
    },
    /**
     * Print debug log
     */
    debug : function(...args) {
        if (this.level < DEBUG_LEVEL_VALUE) {
            return;
        }

        this.print('debug', ...args);
    },
    /**
     * Print info log
     */
    info : function(...args) {
        if (this.level < INFO_LEVEL_VALUE) {
            return;
        }
        
        this.print('info', ...args);
    },
    /**
     * Print trace log
     */
    trace : function(...args) {
        if (this.level < TRACE_LEVEL_VALUE) {
            return;
        }
        
        this.print('trace', ...args);
    },
    /**
     * Print warn log
     */
    warn : function(...args) {
        if (this.level < WARN_LEVEL_VALUE) {
            return;
        }
        
        this.print('warn', ...args);
    },
    error : function(...args) {
        if (this.level < ERROR_LEVEL_VALUE) {
            return;
        }
        
        this.print('error', ...args);
    },
    /**
     * Call console.time
     * 
     * @param {String} label 
     */
    time : function(label) {
        if (this.level < TIME_LEVEL_VALUE) {
            return;
        }
        // eslint-disable-next-line no-console
        console.time(label);
    },
    /**
     * Call console.timeEnd
     * 
     * @param {String} label 
     */
    timeEnd : function(label) {
        if (this.level < TIME_LEVEL_VALUE) {
            return;
        }
        // eslint-disable-next-line no-console
        console.timeEnd(label);
    },
    /**
     * Flush the log content to stdstream and filestreams.
     * 
     * @param {Function} callback
     */
    flush: function(callback) {
        this._printer.flush(callback);
    }
};



module.exports = slogger;