const sinon  = require('sinon');
const assert = require('assert');
var slogger = require('../index');
var spyUtil = require('./util/spy');
var showLog = spyUtil.showLog;
// var spyStdout = require('./util/spy').spyStdout;

function doHeavyWork() {
    for (var i=0;i<20000000;i++) {
        
    }
}

describe('console:',function() {
    describe('test with time #',function() {
        before('before basic test',function() {
            slogger = slogger.init({level:'trace',flushInterval:0});
        });
        showLog();
    });
    
    describe('after set log level to warn#',function() {
        before('should set log level warn success',function() {
            slogger = slogger.init({level:'warn',flushInterval:0});
        });
        showLog(false,'warn');
    });

    describe('print to console delay in fixed interval',function() {
        it('not print right now, but after a fixed time',function(done) {
            var spy =  spyUtil.spyStdout;
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
