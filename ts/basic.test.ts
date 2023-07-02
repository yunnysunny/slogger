import slogger, { LogLevel } from '..';

const logger = slogger.init({level: LogLevel.INFO});
logger.debug('aaa')
logger.info('bbb')