const OPTIONAL_LOG = ['console','log4js','winston'];

exports.getIntance = function(name,level,option) {
    if (OPTIONAL_LOG.indexOf(name) === -1) {
        return null;
    }

    return require('./providers/' + name + '_provider')(level,option);
    
}