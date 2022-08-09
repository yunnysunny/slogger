const sinon  = require('sinon');
const assert = require('assert');
var slogger = require('../../index');
var config = require('../../lib/config');
const stdout = process.stdout;

var spyStdout = exports.spyStdout = null;

// const supportDebugFun = process.version >= 'v8.0';

// function getSpy(printLevel,disableCustomConsole) {
//     if (disableCustomConsole) {//call console origin function
//        switch(printLevel) {
//             case 'debug':
//             return supportDebugFun?
//             spyStdout.debug
//             : spyStdout.info;
//             case 'info':
//             case 'trace':
//             return spyStdout.info;
//             case 'warn':
//             return spyStdout.warn;
//             case 'error':
//             return spyStdout.error;
//         }
//     }
    
//     return spyStdout.info;//use console.info to simulate
// }

function logWithConsoleInfo({printLevel, disableTime, disableLevel, levelCanPrint}) {
   
    // var stdout = getSpy(printLevel,disableTime);

    slogger[printLevel](printLevel);
    
    var levelLimit = config.LOG_LEVEL_MAP[levelCanPrint].value;
    var levelWannaPrint = config.LOG_LEVEL_MAP[printLevel].value;
    // assert that it was called with the correct value
    if (levelWannaPrint <= levelLimit) {
        assert(spyStdout.called);
        const date = new Date();
        const prefixDate = [date.getFullYear(),(date.getMonth()+1),date.getDate()].join('-');
        const printContent = spyStdout.args[0][0];
        if (disableTime) {
            assert(printContent.indexOf(prefixDate) === -1);
        } else {
            assert(printContent.indexOf(prefixDate) !== -1);
        }
        const prefixLevel = '[' + printLevel.toUpperCase() + ']';
        if (disableLevel) {
            assert(printContent.indexOf(prefixLevel) === -1);
        } else {
            assert(printContent.indexOf(prefixLevel) !==-1);
        }
    } else {
        assert(spyStdout.notCalled);
    }   
}
exports.logWithConsoleInfo = logWithConsoleInfo;

function showLog(disableTime,levelCanPrint) {
    disableTime = disableTime || false;
    levelCanPrint = levelCanPrint || 'time';
    

    it('debug log',function() {
        logWithConsoleInfo({printLevel:'debug',disableTime,levelCanPrint});
    });
    it('trace log',function() {
        logWithConsoleInfo({printLevel:'trace',disableTime,levelCanPrint});
    });
    it('info log',function() {
        logWithConsoleInfo({printLevel:'info',disableTime,levelCanPrint});
    });
    it('warn log',function() {
        logWithConsoleInfo({printLevel:'warn',disableTime,levelCanPrint});
    });
    it('error log',function() {
        logWithConsoleInfo({printLevel:'error',disableTime,levelCanPrint});
    });
}
exports.showLog = showLog;

beforeEach(function() {
    spyStdout = exports.spyStdout = sinon.spy(stdout,'write');
});
afterEach(function() {
    if (spyStdout) {
        spyStdout.restore();
        spyStdout = null;
        exports.spyStdout = null;
    }
});