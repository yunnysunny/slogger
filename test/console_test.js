const sinon  = require('sinon');
const assert = require('assert');
var slogger = require('../index');
var config = require('../lib/config');
var spyMap = {
    info : null,
    warn : null,
    error:null
};

function getSpy(printLevel,disableCustomConsole) {
    if (disableCustomConsole) {//call console origin function
       switch(printLevel) {
            case 'debug':
            case 'info':
            case 'trace':
            return spyMap.info;
            break;
            case 'warn':
            return spyMap.warn;
            break;
            case 'error':
            return spyMap.error;
            break;
        }
    }
    
    return spyMap.info;//use console.info to simulate
}

function logWithConsoleInfo(printLevel,disableCustomConsole,levelCanPrint) {
   
    var spy = getSpy(printLevel,disableCustomConsole);

    slogger[printLevel](printLevel);
    
    var levelLimit = config.LOG_LEVEL_MAP[levelCanPrint].value;
    var levelWannaPrint = config.LOG_LEVEL_MAP[printLevel].value;
    // assert that it was called with the correct value
    if (levelWannaPrint <= levelLimit) {
        assert(spy.called);
        if (disableCustomConsole) {
            assert(spy.calledWith(printLevel));
        } else {
            assert(spy.args[0][0].indexOf(' GMT') !== -1);
        }
    } else {
        assert(spy.notCalled);
    }   
}
function showLog(disableCustomConsole,levelCanPrint) {
    disableCustomConsole = disableCustomConsole || false;
    levelCanPrint = levelCanPrint || 'time';
    

    it('debug log',function() {
        logWithConsoleInfo('debug',disableCustomConsole,levelCanPrint);
    });
    it('trace log',function() {
        logWithConsoleInfo('trace',disableCustomConsole,levelCanPrint);
    });
    it('info log',function() {
        logWithConsoleInfo('info',disableCustomConsole,levelCanPrint);
    });
    it('warn log',function() {
        logWithConsoleInfo('warn',disableCustomConsole,levelCanPrint);
    });
    it('error log',function() {
        logWithConsoleInfo('error',disableCustomConsole,levelCanPrint);
    });
}
function doHeavyWork() {
    for (var i=0;i<20000000;i++) {
        
    }
}
function doTimeTest() {
    
}
beforeEach(function() {
    spyMap.info = sinon.spy(console, 'info');
    spyMap.warn = sinon.spy(console,'warn');
    spyMap.error = sinon.spy(console,'error');
});
afterEach(function() {
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


describe('console',function() {
    describe('test with time',function() {
        showLog();
    });
    
    describe('test without time',function() {
        it('to remove time prefix',function() {
            slogger = slogger.init({disableCustomConsole:true});
        });
        showLog(true);
    });
    describe('after set log level to warn',function() {
        it('should set log level warn success',function() {
            slogger = slogger.init({level:'warn'});
        });
        showLog(false,'warn');
    });

    describe('do time calculate',function() {
        it('should not show time when level not match',function() {
            var spy =  sinon.spy(console, 'time');
            slogger.time('heavyWork');
            doHeavyWork();
            slogger.timeEnd('heavyWork');
            assert(spy.notCalled);
            spy.restore();
        });
        it('should show time result',function() {
            slogger.level = slogger.config.TIME_LEVEL_VALUE;
            var spy =  sinon.spy(console, 'time');
            slogger.time('heavyWork');
            doHeavyWork();
            slogger.timeEnd('heavyWork');
            assert(spy.called);
            spy.restore();
        });
    });
});
