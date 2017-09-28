const sinon  = require('sinon');
const assert = require('assert');
var slogger = require('../../index');
var config = require('../../lib/config');

var spyMap = exports.spyMap = {
    debug:null,
    info : null,
    warn : null,
    error:null
};

const supportDebugFun = process.version >= 'v8.0';

function getSpy(printLevel,disableCustomConsole) {
    if (disableCustomConsole) {//call console origin function
       switch(printLevel) {
            case 'debug':
            return supportDebugFun?
            spyMap.debug
            : spyMap.info;
            case 'info':
            case 'trace':
            return spyMap.info;
            case 'warn':
            return spyMap.warn;
            case 'error':
            return spyMap.error;
        }
    }
    
    return spyMap.info;//use console.info to simulate
}

function logWithConsoleInfo(printLevel,disableTime,levelCanPrint) {
   
    var spy = getSpy(printLevel,disableTime);

    slogger[printLevel](printLevel);
    
    var levelLimit = config.LOG_LEVEL_MAP[levelCanPrint].value;
    var levelWannaPrint = config.LOG_LEVEL_MAP[printLevel].value;
    // assert that it was called with the correct value
    if (levelWannaPrint <= levelLimit) {
        assert(spy.called);
        if (disableTime) {
            assert(spy.calledWith(printLevel));
        } else {
            const date = new Date();
            const perfix = [date.getFullYear(),(date.getMonth()+1),date.getDate()].join('-');
            assert(spy.args[0][0].indexOf(perfix) !== -1);
        }
    } else {
        assert(spy.notCalled);
    }   
}
function showLog(disableTime,levelCanPrint) {
    disableTime = disableTime || false;
    levelCanPrint = levelCanPrint || 'time';
    

    it('debug log',function() {
        logWithConsoleInfo('debug',disableTime,levelCanPrint);
    });
    it('trace log',function() {
        logWithConsoleInfo('trace',disableTime,levelCanPrint);
    });
    it('info log',function() {
        logWithConsoleInfo('info',disableTime,levelCanPrint);
    });
    it('warn log',function() {
        logWithConsoleInfo('warn',disableTime,levelCanPrint);
    });
    it('error log',function() {
        logWithConsoleInfo('error',disableTime,levelCanPrint);
    });
}
exports.showLog = showLog;

beforeEach(function() {
    if (supportDebugFun) {
        spyMap.debug = sinon.spy(console,'debug');
    }
    
    spyMap.info = sinon.spy(console, 'info');
    spyMap.warn = sinon.spy(console,'warn');
    spyMap.error = sinon.spy(console,'error');
});
afterEach(function() {
    if (supportDebugFun && spyMap.debug) {
        spyMap.debug.restore();
    }
    if (spyMap.info) {
        spyMap.info.restore();
    }
    if (spyMap.warn) {
        spyMap.warn.restore();
    }
    if (spyMap.error) {
        spyMap.error.restore();
    }
});