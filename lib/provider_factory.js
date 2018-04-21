const OPTIONAL_LOG = ['console','log4js','winston'];
const INSTANCE_MAP = {
    console:require('./providers/ConsoleProvider'),
    log4js:require('./providers/Log4jsProvider'),
    winston:require('./providers/WinstomProvider')
};

exports.getIntance = function(name,level,option) {
    if (OPTIONAL_LOG.indexOf(name) === -1) {
        return null;
    }

    return new INSTANCE_MAP[name](level,option);
};