var slogger = require('../index');
var spyUtil = require('./util/spy');   
    
describe('console with custom format #',function() {
    it('no time prefix',function() {
        slogger = slogger.init({
            disableTimePrefix: true,
            disableLevelPrefix: false,
            flushInterval: 0
        });
        spyUtil.logWithConsoleInfo({
            printLevel:'debug',
            disableTime: true,
            levelCanPrint: 'debug'
        });
    });
    it('no level prefix',function() {
        slogger = slogger.init({
            disableTimePrefix: false,
            disableLevelPrefix: true,
            flushInterval: 0
        });

        spyUtil.logWithConsoleInfo({
            printLevel:'debug',
            disableLevel: true,
            levelCanPrint: 'debug'
        });
    });

    it('no time and level prefix',function() {
        slogger = slogger.init({
            disableTimePrefix: true,
            disableLevelPrefix: true,
            flushInterval: 0
        });

        spyUtil.logWithConsoleInfo({
            printLevel:'debug',
            disableTime: true,
            disableLevel: true,
            levelCanPrint: 'debug'
        });
    });
});