var winston = require('winston');
var config = require('../config');
// var _unshift = Array.prototype.unshift;
const MAP_LOG_LEVEL = config.MAP_LOG_LEVEL;

const LEVEL_CONFIG = {levels : {}, colors : {}};
for (var key in MAP_LOG_LEVEL) {
    var levelNow = MAP_LOG_LEVEL[key];
    LEVEL_CONFIG.levels[key] = levelNow.value;
    LEVEL_CONFIG.colors[key] = levelNow.colorName;
}
var logger = new (winston.Logger)(LEVEL_CONFIG);

module.exports = function(level,options) {
    logger.add(winston.transports.Console, {
        level: level,
        prettyPrint: true,
        colorize: true,
        silent: false,
        timestamp: function() { return new Date().toString(); }
    });
    
    return {
        print : function(args,level) {
            // _unshift.call(args,level);
            logger[level].apply(logger,args);
        }
    };
};