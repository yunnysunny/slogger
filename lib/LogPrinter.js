const path = require('path');
const fs = require('fs');
const config = require('./config');
const LOG_LEVEL_MAP = config.LOG_LEVEL_MAP;
const NEW_LINE_SEPARATOR = require('os').EOL;
const PID = process.pid;
const STREAM_BROKEN_MSG = `current process' [${PID}] stream is broken`;
const consoleStream = process.stdout;

/**
 * 
 * @typedef LogFileItem
 * 
 * @property {String} filename The file to save the log.
 * @property {String} category The category of the log , it can be the log level, such as `debug` `info` `warn` `error`, or it can be a custom string.
 */

 /**
  * @typedef QueueScheduleProducer
  * 
  * @property {RdKafkaProducer} producer The instanceof `RdKafkaProducer` from the package of `queue-schedule`.
  * @property {String} category The category of the log , it can be the log level, such as `debug` `info` `warn` `error`, or it can be a custom string.
  * 
  */

/**
 * Format the Date to a string.
 * 
 * @private
 * @param {Date} date 
 */
function dateFormat(date) {
    return date.getFullYear()+'-' + (date.getMonth() + 1) + '-'+date.getDate() + ' '+date.getHours()+':'+date.getMinutes() + ':'+date.getSeconds() + '.' + date.getMilliseconds();
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
            str += element.stack + NEW_LINE_SEPARATOR;
        } else if (typeof(element) === 'object') {
            str += JSON.stringify(element);
        } else {
            str += element;
        }
        if (i !== len - 1) {
            str += ' ';
        }
    }
    return str;
}
function getRealFilename(filename,clusterNum) {
    if (!clusterNum) {
        return filename;
    }
    const dir = path.dirname(filename);
    const ext = path.extname(filename);
    if (ext) {
        return dir + '/' + path.basename(filename,ext) + '-' + clusterNum + ext;
    }
    return filename + '-' + clusterNum;
}

/**
 * @private
 * @param {Object} options 
 * @param {Number} [options.flushInterval=0] The interval time to flush the log content to console and files.
 * @param {LogFileItem[]}  [options.logFiles]
 * @param {QueueScheduleProducer[]} [options.producers]
 * @param {Boolean=}  [options.disableTimePrefix=false] Whether disable the time prefix.
 * @param {Boolean=} [options.disableLevelPrefix=false] Whether disble the level string prefix.
 * @param {String=} [options.projectName=''] The name of project which use slogger.
 */
function LogPrinter(options) {

    this._flushInteval = options.flushInterval|| 0;
    this._logCache = '';
    const logFiles = options.logFiles || [];
    this._disableTimePrefix = options.disableTimePrefix;
    this._disableLevelPrefix = options.disableLevelPrefix;
    this._levelFileMap = {};
    this._levelFileLen = 0;
    this._levelKafkaMap = {};
    this._clusterNum = process.env.NODE_APP_INSTANCE;
    this._projectName = options.projectName || '';

    if (logFiles.length > 0) {
        for(var i=0,len=logFiles.length;i<len;i++) {
            const logFileConfig = logFiles[i];
            const filename = logFileConfig.filename;
            const category = logFileConfig.category;
            if (!this._levelFileMap[category]) {
                this._levelFileMap[category] = {
                    logCache:'',
                    streams:[]
                };
                this._levelFileLen++;
            }
            this._levelFileMap[category].streams.push(
                fs.createWriteStream(getRealFilename(filename,this._clusterNum), {'flags': 'a'})
            ); 
        }
    }
    const producers = options.producers || [];
    for (let i=0,len=producers.length;i<len;i++) {
        const lsConfig = producers[i];
        this._levelKafkaMap[lsConfig.category] = lsConfig.producer;
    }

    
    if (this._flushInteval > 0) {
        this._flushLog();
    }
}
LogPrinter.prototype._doSimpleWriteToStream = function(streams, content) {
    for(var j=0,lenStrean=streams.length;j<lenStrean;j++) {
        const stream = streams[j];
        if (stream.writable) {
            stream.write(content);
        } else {
            console.error(STREAM_BROKEN_MSG, 'fd', stream.fd);
        }
    }
}
LogPrinter.prototype._wirteToStream = function(fileConfig, callback) {
    var streams = fileConfig.streams;
    var content = fileConfig.logCache;
    var count = 0;

    if (typeof (callback) === 'function') {
        for(var i=0,len=streams.length;i<len;i++) {
            const stream = streams[i];
            if (!stream.writable) {
                return callback(STREAM_BROKEN_MSG);
            }
            stream.write(content, function() {
                count++;
                if (count === len) {
                    callback();
                }
            });
        }
    } else {
        this._doSimpleWriteToStream(streams, content);
    }
};

LogPrinter.prototype._doSimpleFlushFileStream = function() {
    for (var levelNow in this._levelFileMap) {
        var fileConfigNow = this._levelFileMap[levelNow];
        if (!fileConfigNow.logCache) {
            continue;
        }
        this._wirteToStream(fileConfigNow);
        fileConfigNow.logCache = '';
    }
};

LogPrinter.prototype._flushFileStream = function(callback) {
    var _this = this;
    var fileLen = this._levelFileLen;
    function doEnd(countNow) {
        if (countNow === fileLen) {
            callback();
        }
    }    
    if (typeof (callback) === 'function') {
        var count = 0;
        for (var level in _this._levelFileMap) {
            var fileConfig = _this._levelFileMap[level];
            if (!fileConfig.logCache) {
                count++;
                doEnd(count);
                continue;
            }
            _this._wirteToStream(fileConfig, function() {
                count++;
                doEnd(count);
            });
            fileConfig.logCache = '';
        }
    } else {
        this._doSimpleFlushFileStream();
    }
};
/**
 * Flush the log content to stdstream and filestreams.
 * 
 * @param {Function} callback
 */
LogPrinter.prototype.flush = function(callback) {
    if (this._logCache) {
        consoleStream.write(this._logCache);
        // console.info(_this._logCache);
        this._logCache = '';
        // stdout.uncork();
    }
    if (this._levelFileLen > 0) {
        this._flushFileStream(callback);
    } else {
        if (typeof (callback) === 'function') {
            callback();
        }
    }
};

LogPrinter.prototype._flushLog = function() {
    var _this = this;
    setTimeout(function flushTimeout() {
        _this.flush();
        _this._flushLog();
    },this._flushInteval);
};

LogPrinter.prototype.print = function(args,level) {

    var config = LOG_LEVEL_MAP[level] || {color : ''};
    var prefix = this._disableLevelPrefix ? '' : config.color;
    if (!this._disableTimePrefix) {
        prefix += dateFormat(new Date());
    }
    if (!this._disableLevelPrefix) {
        prefix += ' ['+(config.showName || level)+'] \x1b[0m';
    }

    var len = args.length;
    var params = new Array(len+1);
    params[0] = prefix;
    for (var i=1;i<=len;i++) {
        params[i] = args[i-1];
    }
    var logContent = myFormat(params) + NEW_LINE_SEPARATOR;
    var fileConfig = this._levelFileMap[level];
    if (this._flushInteval > 0) {
        this._logCache += logContent;
        
        if (fileConfig) {
            fileConfig.logCache += logContent;
        }
    } else {
        consoleStream.write(logContent);
        if (fileConfig) {
            fileConfig.logCache = logContent;
            this._wirteToStream(fileConfig);
        }
    }
    var queueScheduleStream = this._levelKafkaMap[level];
    if (queueScheduleStream) {
        queueScheduleStream.addData({projectName:this._projectName,level,logContent});
    }
};

module.exports = LogPrinter;