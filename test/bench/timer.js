var slogger = require('../../index');
slogger.init({flushInterval:50});
const begin = Date.now();
const MAX_AGE = 60 * 1000 * 15;
const WRITE_INTERVAL = 10;
let isEnd = false;
function show() {
    if (Date.now() - begin > MAX_AGE) {
        // 
       if (!isEnd) {
            console.error('test end');
            isEnd =true;
       } else {
            
       }
    } else {
        slogger.debug(new Date().toLocaleTimeString());
    }
    
    
    setTimeout(function() {
        show();
    },WRITE_INTERVAL);
}

show();