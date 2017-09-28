var slogger = require('../index');
const assert = require('assert');
var spyMap = require('./util/spy').spyMap;   
// const sinon  = require('sinon');   
    
describe('console with custom format, but disable the time prefix',function() {
    before('init',function() {
        slogger = slogger.init({disableTimePrefix:true});
    });
    //showLog(true);
    it('',function() {
        var spy =  spyMap.info;

            slogger.debug('withtout time');
            assert(spy.called);
            spy.restore();
    });
    
});