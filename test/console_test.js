const sinon  = require('sinon');
const assert = require('assert');
var slogger = require('../index');
var config = require('../lib/config');
var spyMap = {
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
function doHeavyWork() {
    for (var i=0;i<20000000;i++) {
        
    }
}

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


describe('console:',function() {
    describe('test with time #',function() {
        showLog();
    });
    
    describe('test without time#',function() {
        before('to remove time prefix',function() {
            slogger = slogger.init({disableCustomConsole:true});
        });
        showLog(true);
    });
    describe('after set log level to warn#',function() {
        before('should set log level warn success',function() {
            slogger = slogger.init({level:'warn'});
        });
        showLog(false,'warn');
    });
    describe('console with custom format, but disable the time prefix',function() {
        before('init',function() {
            slogger = slogger.init({disableTime:true});
        });
        showLog(false);
    });
    describe('print to console delay in fixed interval',function() {
        it('not print right now, but after a fixed time',function(done) {
            var spy =  spyMap.info;
            var interval = 500;
            slogger = slogger.init({flushInterval:interval});
            slogger.debug('delay print');
            assert(spy.notCalled);
            setTimeout(function() {
                assert(spy.called);
                //spy.restore();
                done();
            },interval*2);//make sure the internal timer triggered
            
        });
    });

    describe('do time calculate#',function() {
        it('should not show time when level not match',function() {
            var spy =  sinon.spy(console, 'time');
            slogger = slogger.init({level:'debug'});
            slogger.time('heavyWork');
            doHeavyWork();
            slogger.timeEnd('heavyWork');
            assert(spy.notCalled);
            spy.restore();
        });
        it('should show time result',function() {
            slogger = slogger.init();
            var spy =  sinon.spy(console, 'time');
            slogger.time('heavyWork');
            doHeavyWork();
            slogger.timeEnd('heavyWork');
            assert(spy.called);
            spy.restore();
        });
    });
});
