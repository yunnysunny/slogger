var winston = require('winston');
var config = require('../config');
// var _unshift = Array.prototype.unshift;
const LOG_LEVEL_MAP = config.LOG_LEVEL_MAP;

const LEVEL_CONFIG = {levels : {}, colors : {}};
for (var key in LOG_LEVEL_MAP) {
    var levelNow = LOG_LEVEL_MAP[key];
    LEVEL_CONFIG.levels[key] = levelNow.value;
    LEVEL_CONFIG.colors[key] = levelNow.colorName;
}
var logger = new (winston.Logger)(LEVEL_CONFIG);

// module.exports = function(level,options) {
//     logger.add(winston.transports.Console, {
//         level: level,
//         prettyPrint: true,
//         colorize: true,
//         silent: false,
//         timestamp: function() { return new Date().toString(); }
//     });
    
//     return {
//         print : function(args,level) {
//             // _unshift.call(args,level);
//             logger[level].apply(logger,args);
//         }
//     };
// };

function WinstomProvider(level) {
    logger.add(winston.transports.Console, {
        level: level,
        prettyPrint: true,
        colorize: true,
        silent: false,
        timestamp: function() { return new Date().toString(); }
    });
}

WinstomProvider.prototype.print = function(args,level) {
    logger[level].apply(logger,args);
};

module.exports = WinstomProvider;