import path from 'node:path';
import   sinon from 'sinon';
import  assert from 'node:assert';
import fs from 'node:fs';
import { LogLevel, Slogger } from '../src';
let spyWrite: sinon.SinonSpy<
[chunk: any, encoding: BufferEncoding, callback?: ((error: Error | null | undefined) => void) | undefined], 
boolean
> ;
const VALUE_FLUSH_INTERVAL = 100;
const WRITE_COUNT = 100;


describe('write log to file #',function() {
    let stream: fs.WriteStream
    let slogger: Slogger
    before('init',function() {
        stream = fs.createWriteStream(path.join(__dirname , './log/warn.log'))
        slogger = new Slogger({
            flushInterval:VALUE_FLUSH_INTERVAL,
            streams: {
                [LogLevel.WARN]: stream,
            }
            
        });
        spyWrite = sinon.spy(stream,'write');
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
