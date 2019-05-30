class LogstashStream {
    constructor({delayTime=200}) {
        this._queue = [],
        this._delayTime = delayTime;
        this._delaySend();
    }
    _doSend(data, callback) {
        throw new Error('not implemented!');
    }
    _delaySend(){
        const _this = this;
        setTimeout(function(){
            if(_this._queue.length) {
                const data = _this._queue.slice();
                _this._doSend(data, function(err){
                    if(err) {
                        console.error('delay log send error',err);
                    }
                    _this._delaySend();
                });
                _this._queue = [];
            } else {
                _this._delaySend();
            }
            
        }, _this._delayTime);
    }
    addData(data) {
        if(Array.isArray(data)) {
            this._queue = this._queue.concat(data);
        } else {
            this._queue.push(data); 
        }
    }
}

module.exports = LogstashStream;