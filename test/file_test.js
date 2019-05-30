const path = require('path');
var slogger = require('../index');
const sinon  = require('sinon');
const assert = require('assert');
var spyWrite = null;
const VALUE_FLUSH_INTERVAL = 100;
const WRITE_COUNT = 100;


describe('write log to file #',function() {
    before('init',function() {
        slogger = slogger.init({
            flushInterval:VALUE_FLUSH_INTERVAL,
            logFiles:[
                {category:'warn',filename:path.join(__dirname , './log/warn.log')}
            ]
        });
        spyWrite = sinon.spy(slogger._printer._levelFileMap['warn'].streams[0],'write');
    });

    it('write to file ' + WRITE_COUNT + ' times',function(done) {
        for (var i=0;i<WRITE_COUNT;i++) {
            slogger.warn(i);
        }
        setTimeout(function() {
            assert(spyWrite.called);
            done();
        },VALUE_FLUSH_INTERVAL + 100);
    });
    after(function() {
        spyWrite.restore();
    });
});
