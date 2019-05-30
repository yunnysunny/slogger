const AbstractDelaySender = require('./AbstractDelaySender');
class LogstashSender extends AbstractDelaySender {
    constructor(options) {
        super(options);
        this._logstash = options.logstash;
    }
    _doSend(data,callback) {
        this._logstash.send(data,callback);
    }
}

module.exports = LogstashSender;