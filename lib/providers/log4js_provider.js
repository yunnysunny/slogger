var log4js = require('log4js');
var logger = log4js.getLogger();

module.exports = function(level) {
    
    logger.level = level;
    return {
        print : function(args,level) {
            
            logger[level].apply(logger,args);
        }
    };
};