import {
    Writable,
} from 'node:stream';

export enum LogLevel {
    TIME = 'time',
    TRACE = 'trace',
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
}

interface LogLevelTimeConfig {
    value: 5;
    showName: 'TIME';
}
export interface LogLevelNormalConfig {
    value: number;
    showName: string;
    color: string;
    colorName: string;
}
type LogLevelConfig = LogLevelNormalConfig | LogLevelTimeConfig
/**
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
 */
export const LogLevelRecord: Record<LogLevel, LogLevelConfig> = {
    [LogLevel.TIME]: {
        value: 5,
        showName: 'TIME',
    },
    [LogLevel.TRACE]:{
        value: 4,
        showName: 'TRACE',
        color : '\x1b[36m',
        colorName : 'cyan',
    },
    [LogLevel.DEBUG]: {
        value: 3,
        showName: 'DEBUG',
        color : '\x1b[32m',
        colorName : 'green',
    },
    [LogLevel.INFO]: {
        value: 2,
        showName: 'INFO',
        color : '\x1b[32m',
        colorName : 'green',
    },
    [LogLevel.WARN]: {
        value: 1,
        showName: 'WARN',
        color : '\x1b[33m',
        colorName : 'yellow',
    },
    [LogLevel.ERROR]: {
        value: 0,
        showName: 'ERROR',
        color : '\x1b[31m',
        colorName : 'red',
    },
}
export type NormalLevel = LogLevel.TRACE | LogLevel.DEBUG | LogLevel.INFO | LogLevel.WARN | LogLevel.ERROR
type PartialRecordOfEnum<T extends string, U> = {
    [P in T]?: U;
  };
export type CustomSteamRecord = PartialRecordOfEnum<NormalLevel, Writable>
;
export interface SloggerOptions {
    /**
     * The level of logger, it can be `time` `trace` `debug` `warn`  `error`,the default is `time`.
     */
    level?: LogLevel;
    /**
     * Print the log to console in a fixed time,
     * all logs between the interval will be cached, 
     * and then flush to console when the internal timer trigger.
     * it only takes effect when you use custom console format.
     */
    flushInterval?: number;
    /**
     * The streams to storage the log
     */
    streams?: CustomSteamRecord;
    /**
     * Whether disable the time prefix.
     */
    disableTimePrefix?: boolean;
    /**
     * Whether disable the level string prefix.
     */
    disableLevelPrefix?: boolean;
    // /**
    //  * The name of project which use slogger
    //  */
    // projectName?: string;
    /**
     * The new line separator in console and stream
     */
    newLineSeparator?: string
}

