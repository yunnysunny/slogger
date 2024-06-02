import {Slogger} from '../src/index';
import {logWithConsoleInfo} from './util/spy';
    
describe('console with custom format #',function() {
    it('no time prefix',function() {
        const slogger = new Slogger({
            disableTimePrefix: true,
            disableLevelPrefix: false,
            flushInterval: 0
        });
        logWithConsoleInfo({
            slogger,
            printLevel:'debug',
            disableTime: true,
            levelCanPrint: 'debug'
        });
    });
    it('no level prefix',function() {
        const slogger = new Slogger({
            disableTimePrefix: false,
            disableLevelPrefix: true,
            flushInterval: 0
        });

        logWithConsoleInfo({
            slogger,
            printLevel:'debug',
            disableLevel: true,
            levelCanPrint: 'debug'
        });
    });

    it('no time and level prefix',function() {
        const slogger = new Slogger({
            disableTimePrefix: true,
            disableLevelPrefix: true,
            flushInterval: 0
        });

        logWithConsoleInfo({
            slogger,
            printLevel:'debug',
            disableTime: true,
            disableLevel: true,
            levelCanPrint: 'debug'
        });
    });
});