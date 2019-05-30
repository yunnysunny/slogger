const Logstash = require('logstash-client');
const sinon  = require('sinon');
const assert = require('assert');
var slogger = require('../index');
const {LOGSTASH_HOST,LOGSTASH_PORT} = process.env;
var spyLogstash = null;
const VALUE_FLUSH_INTERVAL = 100;
const WRITE_COUNT = 100;


describe('write log to logstash #',function() {
    before('init',function() {
        slogger = slogger.init({
            flushInterval:VALUE_FLUSH_INTERVAL,
            logstashes:[{
                category: 'warn',
                server: new Logstash({
                    type: 'tcp',
                    host: LOGSTASH_HOST,
                    port: LOGSTASH_PORT
        
                })
            }]
        });
        spyLogstash = sinon.spy(slogger._printer._levelLogstashMap['warn']._logstash,'send')
    });

    it('write to logstash ' + WRITE_COUNT + ' times',function(done) {
        for (var i=0;i<WRITE_COUNT;i++) {
            slogger.warn(i);
        }
        setTimeout(function() {
            assert(spyLogstash.called);
            done();
        },VALUE_FLUSH_INTERVAL + 100);
    });
    after(function() {
        spyLogstash.restore();
    });
});
