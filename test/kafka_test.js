const Kafka = require('node-rdkafka');
const {RdKafkaProducer} = require('queue-schedule');
const sinon  = require('sinon');
const assert = require('assert');
var slogger = require('../index');
// const {LOGSTASH_HOST,LOGSTASH_PORT} = process.env;
var spyKafka = null;
const VALUE_FLUSH_INTERVAL = 100;
const WRITE_COUNT = 100;
const producerRd = new Kafka.HighLevelProducer({
    'metadata.broker.list': process.env.KAFKA_HOST,
    'linger.ms':0.1,
    'queue.buffering.max.ms': 500,
    'queue.buffering.max.messages':1000,
    // debug: 'all'
});

const producer = new RdKafkaProducer({
    name : 'slogger.warn',
    topic: 'topic.test',
    producer:producerRd,
    delayInterval: 500
});

describe('write log to kafka #',function() {
    before('init',function() {
        slogger = slogger.init({
            flushInterval:VALUE_FLUSH_INTERVAL,
            producers:[{
                category: 'warn',
                producer
            }]
        });
        spyKafka = sinon.spy(slogger._printer._levelKafkaMap['warn'],'addData');
    });

    it('write to kafka ' + WRITE_COUNT + ' times',function(done) {
        for (var i=0;i<WRITE_COUNT;i++) {
            slogger.warn(i);
        }
        setTimeout(function() {
            assert(spyKafka.called);
            done();
        },VALUE_FLUSH_INTERVAL + 100);
    });
    after(function() {
        spyKafka.restore();
    });
});
