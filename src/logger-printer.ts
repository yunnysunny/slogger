// import {  EOL as NEW_LINE_SEPARATOR}  from 'os';
import {
    CustomSteamRecord,
    LogLevel,
    LogLevelNormalConfig,
    LogLevelRecord,
    NormalLevel,
    SloggerOptions,
} from './interfaces';
import { Writable } from 'node:stream';
import process from 'node:process';
import { ServerlessStdStream } from './serverless-std-stream';

const PID = process.pid;
const STREAM_BROKEN_MSG = `current process' [${PID}] stream is broken`;
const consoleStream = process.stdout || new ServerlessStdStream();

function padStart(value: number, length: number) {
    const str = value.toString();
    if (length <= str.length) {
        return str;
    }
    return '0'.repeat(length - str.length) + str;
}

/**
 * Format the Date to a string.
 * 
 * @private
 * @param {Date} date 
 */
function dateFormat(date: Date) {
    return date.getFullYear()+'-' + (date.getMonth() + 1) + '-'+date.getDate()
        + ' '+date.getHours()+':'+date.getMinutes() + ':'+date.getSeconds()
        + '.' + padStart(date.getMilliseconds(), 3)
}

function myFormat(params: unknown[], NEW_LINE_SEPARATOR: string) {
    var str = '';
    if (!params) {
        return str;
    }
    let element;
    for (let i=0,len=params.length;i<len;i++) {
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

export class LoggerPrinter {
    private readonly _flushInterval: number;
    private _logCache: string;
    private readonly _disableTimePrefix?: boolean;
    private readonly _disableLevelPrefix?: boolean;
    private readonly customStreamLen: number;
    private readonly _projectName?: string;
    private readonly customStreams?: CustomSteamRecord;
    private readonly customStreamsCache: Map<NormalLevel, string> = new Map()
    private readonly newLineSeparator: string = '\n';
    public  constructor(options: SloggerOptions) {

        this._flushInterval = options.flushInterval|| 0;
        this._logCache = '';
        this._disableTimePrefix = options.disableTimePrefix;
        this._disableLevelPrefix = options.disableLevelPrefix;
        this.customStreamLen = 0;
        // this._projectName = options.projectName || '';
        this.customStreams = options.streams;
        this.newLineSeparator = options.newLineSeparator || this.newLineSeparator;
        if (this.customStreams) {
            for (const level in this.customStreams) {
                this.customStreamsCache.set(level as NormalLevel, '');
                this.customStreamLen++;
            }
        }
        if (this._flushInterval > 0) {
            this.flushLog();
        }
    }

    private writeToStream(stream: Writable, value: string, callback?: (err: any) => void)  {
        if (typeof (callback) === 'function') {
            stream.write(value, callback);
        } else {
            if (stream.writable) {
                stream.write(value);
            } else {
                console.error(STREAM_BROKEN_MSG,);
            }
        }
    }
    
    
    private flushCustomStream(callback?: Function) {
        let lastError: any;
        let lastErrorLevel: LogLevel;
        const streamsLen = this.customStreamLen;
        function doEnd(countNow: number) {
            if (countNow === streamsLen) {
                callback && callback(lastError, lastErrorLevel);
            }
        }    

        let count = 0;
        const entities = this.customStreamsCache.entries();
        for (const [level, value] of entities) {
            if (!value) {
                continue;
            }
            this.writeToStream(this.customStreams?.[level] as Writable, value, (err: any) => {
                this.customStreamsCache.set(level, '');
                lastError = err;
                lastErrorLevel = level;
                count++;
                doEnd(count);
            });
        }


    };
    /**
     * Flush the log content to std stream and custom streams.
     * 
     * @param {Function} callback
     */
    public flush(callback?: Function) {
        if (this._logCache) {
            consoleStream.write(this._logCache);
            this._logCache = '';
        }
        if (this.customStreamLen > 0) {
            this.flushCustomStream(callback);
        } else {
            if (typeof (callback) === 'function') {
                callback();
            }
        }
    }

    public get logCache() {
        return this._logCache;
    }

    public getStreamCache(level: NormalLevel) {
        return this.customStreamsCache.get(level) || '';
    }
    
    private flushLog() {
        var _this = this;
        setTimeout(function flushTimeout() {
            _this.flush((err: any, level: LogLevel) => {
                if (err) {
                    console.error('write stream emit error on level' + level, err);
                }
            });
            _this.flushLog();
        },this._flushInterval);
    };
    
    public print(args: unknown[],level: NormalLevel) {    
        const config = LogLevelRecord[level] as LogLevelNormalConfig;
        let prefix = this._disableLevelPrefix ? '' : config.color;
        if (!this._disableTimePrefix) {
            prefix += dateFormat(new Date());
        }
        if (!this._disableLevelPrefix) {
            prefix += ' ['+(config.showName || level)+'] \x1b[0m';
        }
    
        const len = args.length;
        const params = new Array(len+1);
        params[0] = prefix;
        for (var i=1;i<=len;i++) {
            params[i] = args[i-1];
        }
        const logContent = myFormat(params, this.newLineSeparator) + this.newLineSeparator;
        const customStream = this.customStreams?.[level];
        if (this._flushInterval > 0) {
            this._logCache += logContent;
            
            if (customStream) {
                const streamCache = this.customStreamsCache.get(level);
                this.customStreamsCache.set(level, streamCache + logContent);
            }
        } else {
            consoleStream.write(logContent);
            if (customStream) {
                customStream.write(logContent);
            }
        }

    }
}


