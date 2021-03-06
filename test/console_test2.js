var slogger = require('../index');
var spyUtil = require('./util/spy');   
    
describe('console with custom format, but disable the time prefix #',function() {
    before('init',function() {
        slogger = slogger.init({disableTimePrefix:true,flushInterval:0});
    });

    it('no time prefix',function() {
        spyUtil.logWithConsoleInfo('debug',true,'debug');
    });

});