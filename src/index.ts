import {LogLevel, LogLevelRecord, NormalLevel, SloggerOptions} from './interfaces';
import {LoggerPrinter} from './logger-printer';
export {LogLevel};

export class Slogger {
    private readonly levelValue: number;
    private readonly _printer: LoggerPrinter;

    public constructor(options?: SloggerOptions) {
        options = options || {};

        const levelDescription = options.level || LogLevel.TIME;
        const levelOjb = LogLevelRecord[levelDescription];
        if (!levelOjb) {
            this.levelValue = LogLevelRecord.time.value;
            // levelDescription = 'time';
        } else {
            this.levelValue = levelOjb.value;
        }
        this._printer = new LoggerPrinter(options);
    }
    public get printer(): LoggerPrinter {
        return this._printer;
    }
    /**
     * Print log with given level
     *
     */
    public print(level: NormalLevel, ...args: unknown[]) {
        if (this.levelValue < LogLevelRecord[level].value) {
            return;
        }
        return this._printer.print(args,level);
    }
    /**
     * Print debug log
     */
    public debug(...args: unknown[]) {      

        this.print(LogLevel.DEBUG, ...args);
    }
    /**
     * Print info log
     */
    public info(...args: unknown[]) {

        
        this.print(LogLevel.INFO, ...args);
    }
    /**
     * Print trace log
     */
    public trace(...args: unknown[]) {

        
        this.print(LogLevel.TRACE, ...args);
    }
    /**
     * Print warn log
     */
    public warn(...args: unknown[]) {

        
        this.print(LogLevel.WARN, ...args);
    }
    public error(...args: unknown[]) {

        
        this.print(LogLevel.ERROR, ...args);
    }
    /**
     * Call console.time
     * 
     * @param {String} label 
     */
    public time(label: string) {
        if (this.levelValue < LogLevelRecord[LogLevel.TIME].value) {
            return;
        }
        // eslint-disable-next-line no-console
        console.time(label);
    }
    /**
     * Call console.timeEnd
     * 
     * @param {String} label 
     */
    public timeEnd(label: string) {
        if (this.levelValue < LogLevelRecord[LogLevel.TIME].value) {
            return;
        }
        // eslint-disable-next-line no-console
        console.timeEnd(label);
    }
    /**
     * Flush the log content to std stream and custom stream.
     * 
     * @param {Function} callback
     */
    public flush(callback: Function) {
        this._printer.flush(callback);
    }
}
