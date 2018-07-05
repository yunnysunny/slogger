const path = require('path');
const fs = require('fs');
const config = require('./config');
// const format = util.format;
const LOG_LEVEL_MAP = config.LOG_LEVEL_MAP;
const NEW_LINE_SEPARATOR = require('os').EOL;
// var LOG_CACHE = '';
const consoleStream = process.stdout;

/**
 * 
 * @typedef LogFileItem
 * 
 * @property {String} filename The file to save the log.
 * @property {String} category The category of the log , it can be the log level, such as `debug` `info` `warn` `error`, or it can be a custom string.
 */

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
 * 
 * @param {Object} options 
 * @param {Number} options.flushInterval
 * @param {Array[LogFileItem]=} options.logFiles
 * @param {Boolean=false} options.disableTimePrefix Whether disable the time perfix.
 */
function LogPrinter(options) {

    this._flushInteval = options.flushInterval;
    this._logCache = '';
    const logFiles = options.logFiles || [];
    this._disableTimePrefix = options.disableTimePrefix;
    this._levelFileMap = {};
    this._levelFileLen = 0;
    this._clusterNum = process.env.NODE_APP_INSTANCE;

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

    
    if (this._flushInteval > 0) {
        this._flushLog();
    }
}

LogPrinter.prototype._wirteToStream = function(fileConfig) {
    const streams = fileConfig.streams;
    for(var i=0,len=streams.length;i<len;i++) {
        streams[i].write(fileConfig.logCache);
    }
};

LogPrinter.prototype._flushFileStream = function() {
    const _this = this;
    setImmediate(function doFlushFileStream() {
        for (const level in _this._levelFileMap) {
            const config = _this._levelFileMap[level];
            _this._wirteToStream(config);
            level.logCache = '';
        }
    });
};

LogPrinter.prototype._flushLog = function() {
    const _this = this;
    setTimeout(function flushTimeout() {
        if (_this._logCache) {
            consoleStream.write(_this._logCache);
            // console.info(_this._logCache);
            _this._logCache = '';
            // stdout.uncork();
        }
        if (_this._levelFileLen > 0) {
            _this._flushFileStream();
        }
        _this._flushLog();
    },this._flushInteval);
};

LogPrinter.prototype.print = function(args,level) {

    var config = LOG_LEVEL_MAP[level] || {color : ''};
    var prefix = config.color;
    if (!this._disableTimePrefix) {
        prefix += dateFormat(new Date());
    }
    prefix += ' ['+(config.showName || level)+'] \x1b[0m';
    var len = args.length;
    const params = new Array(len+1);
    params[0] = prefix;
    for (var i=1;i<=len;i++) {
        params[i] = args[i-1];
    }
    const logContent = myFormat(params) + NEW_LINE_SEPARATOR;
    const fileConfig = this._levelFileMap[level];
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
    
};

module.exports = LogPrinter;