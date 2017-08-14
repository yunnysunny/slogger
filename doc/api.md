<a name="slogger"></a>

## slogger
The slogger object.

**Kind**: global variable  
<a name="slogger.init"></a>

### slogger.init([options]) ⇒
Init slogger

**Kind**: static method of [<code>slogger</code>](#slogger)  
**Returns**: this  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> |  |
| [options.debugLogger] | <code>Object</code> | The debug logger, if empty, it will use console. |
| [options.traceLogger] | <code>Object</code> | The trace logger, if empty, it will use console. |
| [options.warnLogger] | <code>Object</code> | The warn logger, if empty, it will use console. |
| [options.errorLogger] | <code>Object</code> | The error logger, if empty, it will use console. |
| [options.disableCustomConsole] | <code>Boolean</code> | Whether disable custom console format, if you use third party logger , the param will been ignored. |
| [options.logProvider] | <code>String</code> | The console logger provider, it can be `log4js` `winston` or `console`, the default value is `console`. |
| [otpions.level] | <code>String</code> | The level of logger, it can be `time` `trace` `debug` `warn`  `error`,the default is `time`. |
| [options.disableTimePrefix] | <code>Boolean</code> | Whether disable the time perfix, it only takes effect when you use custom console format. |
| [options.flushInterval] | <code>Number</code> | Print the log to console in a fixed time, all logs between the interval will be cached, and then flush to console when the internal timer trigger.it only takes effect when you use custom console format. |

