var slogger = require('../../index');
slogger.init({flushInterval:500});
const begin = Date.now();
const MAX_AGE = 60 * 1000 * 5;
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
    },1000);
}

show();