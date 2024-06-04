import   sinon from 'sinon';
import   assert from 'node:assert';

import { showLog, spyStdout } from './util/spy'; // 假设spy.js导出一个spyUtil对象或函数
import { LogLevel, Slogger } from '../src';



function doHeavyWork() {
    for (var i=0;i<20000000;i++) {
        
    }
}

describe('console basic:',function() {
    describe('test with time #',function() {
        const slogger = new Slogger({level:'trace' as LogLevel,flushInterval:0});
        showLog(slogger);
    });
    
    describe('after set log level to warn#',function() {
        before('should set log level warn success',function() {
            const slogger = new Slogger({level:'warn' as LogLevel,flushInterval:0});
            showLog(slogger, false,'warn' as LogLevel);
        });
    });

    describe('print to console delay in fixed interval',function() {
        it('not print right now, but after a fixed time',function(done) {
            var interval = 500;
            const slogger = new Slogger({flushInterval:interval});
            slogger.debug('delay print');
            assert(spyStdout.notCalled);
            setTimeout(function() {
                assert(spyStdout.called);
                //spy.restore();
                done();
            },interval*2);//make sure the internal timer triggered
            
        });
    });

    describe('do time calculate#',function() {
        it('should not show time when level not match',function() {
            var spy =  sinon.spy(console, 'time');
            const slogger = new Slogger({level:'debug' as LogLevel});
            slogger.time('heavyWork');
            doHeavyWork();
            slogger.timeEnd('heavyWork');
            assert(spy.notCalled);
            spy.restore();
        });
        it('should show time result',function() {
            const slogger = new Slogger();
            var spy =  sinon.spy(console, 'time');
            slogger.time('heavyWork');
            doHeavyWork();
            slogger.timeEnd('heavyWork');
            assert(spy.called);
            spy.restore();
        });
    });
});
