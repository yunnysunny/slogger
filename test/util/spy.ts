import { LogLevel, Slogger } from "../../src";

import sinon   from 'sinon';
import assert from 'node:assert';
import { LogLevelRecord } from "../../src/interfaces";
const stdout = process.stdout;

export let spyStdout: sinon.SinonSpy<
[str: string | Uint8Array, encoding?: BufferEncoding | undefined, cb?: ((err?: Error | undefined) => void) | undefined],
boolean
>;
// type PublicMethods<T> = Pick<T, { [K in keyof T]: T[K] extends Function ? K : never }>;
// type logFun = Slogger["debug"] | Slogger["info"] | Slogger["trace"] | Slogger["warn"] | Slogger["error"];

// const logFunRecord: Record<LogLevel, logFun> = {
//     [LogLevel.TIME]: function (...args: unknown[]): void {
//         throw new Error("Function not implemented.");
//     },
//     [LogLevel.TRACE]:  Slogger["trace"],
//     [LogLevel.DEBUG]:Slogger["debug"],
//     [LogLevel.INFO]: Slogger["info"],
//     [LogLevel.WARN]: Slogger["warn"],
//     [LogLevel.ERROR]: Slogger["error"]
// }
export function logWithConsoleInfo( {
    slogger, printLevel, disableTime, disableLevel, levelCanPrint
}: {
    slogger: Slogger,
    printLevel: string, 
    disableTime?: boolean, 
    disableLevel?: boolean, 
    levelCanPrint: LogLevel
}) {
    const levelStr = printLevel as LogLevel;
    (slogger as any)[printLevel](levelStr);
    
    var levelLimit = LogLevelRecord[levelCanPrint as LogLevel].value;
    var levelWannaPrint = LogLevelRecord[levelStr].value;
    // assert that it was called with the correct value
    if (levelWannaPrint <= levelLimit) {
        assert(spyStdout.called);
        const date = new Date();
        const prefixDate = [date.getFullYear(),(date.getMonth()+1),date.getDate()].join('-');
        const printContent = spyStdout.args[0][0] as string;
        if (disableTime) {
            assert(printContent.indexOf(prefixDate) === -1);
        } else {
            assert(printContent.indexOf(prefixDate) !== -1);
        }
        const prefixLevel = '[' + levelStr.toUpperCase() + ']';
        if (disableLevel) {
            assert(printContent.indexOf(prefixLevel) === -1);
        } else {
            assert(printContent.indexOf(prefixLevel) !==-1);
        }
    } else {
        assert(spyStdout.notCalled);
    }   
}

export function showLog(slogger: Slogger, disableTime?: boolean,levelCanPrint?: LogLevel) {
    disableTime = disableTime || false;
    const _levelCanPrint = (levelCanPrint || LogLevel.TIME) as LogLevel;
    

    it('debug log',function() {
        logWithConsoleInfo({
            slogger, printLevel:'debug',disableTime,levelCanPrint: _levelCanPrint
        });
    });
    it('trace log',function() {
        logWithConsoleInfo({
            slogger, printLevel: 'trace',disableTime,levelCanPrint: _levelCanPrint
        });
    });
    it('info log',function() {
        logWithConsoleInfo({
            slogger, printLevel: 'info',disableTime,levelCanPrint: _levelCanPrint
        });
    });
    it('warn log',function() {
        logWithConsoleInfo({
            slogger, printLevel: 'warn',disableTime,levelCanPrint: _levelCanPrint
        });
    });
    it('error log',function() {
        logWithConsoleInfo({
            slogger, printLevel: 'error', disableTime,levelCanPrint: _levelCanPrint
        });
    });
}


beforeEach(function() {
    spyStdout =  sinon.spy(stdout,'write');
});
afterEach(function() {
    if (spyStdout) {
        spyStdout.restore();
        // spyStdout = undefined;
    }
});