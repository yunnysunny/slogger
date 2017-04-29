const TRACE_LEVEL_VALUE = exports.TRACE_LEVEL_VALUE = 4;
const DEBUG_LEVEL_VALUE = exports.DEBUG_LEVEL_VALUE = 3;
const INFO_LEVEL_VALUE = exports.INFO_LEVEL_VALUE = 2;
const WARN_LEVEL_VALUE = exports.WARN_LEVEL_VALUE = 1;
const ERROR_LEVEL_VALUE = exports.ERROR_LEVEL_VALUE = 0;
/**
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
 */
exports.MAP_LOG_LEVEL = {
    trace : {color : '\x1b[36m', colorName : 'cyan', value : TRACE_LEVEL_VALUE},
    debug : {color : '\x1b[32m', colorName : 'green', value : DEBUG_LEVEL_VALUE},
    info : {color : '\x1b[32m', colorName : 'green',value : INFO_LEVEL_VALUE},
    warn : {color : '\x1b[33m', colorName : 'yellow',value : WARN_LEVEL_VALUE},
    error : {color : '\x1b[31m', colorName : 'red',value : ERROR_LEVEL_VALUE}
};