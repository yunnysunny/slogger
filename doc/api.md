## Members

<dl>
<dt><a href="#slogger">slogger</a></dt>
<dd><p>The slogger object.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#dateFormat">dateFormat(date)</a></dt>
<dd><p>Format the Date to a string.</p>
</dd>
<dt><a href="#LogPrinter">LogPrinter(options, [undefined], [false])</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#LogFileItem">LogFileItem</a></dt>
<dd></dd>
</dl>

<a name="slogger"></a>

## slogger
The slogger object.

**Kind**: global variable  
<a name="slogger.init"></a>

### slogger.init([options], [time], [0], [undefined], [false]) ⇒
Init slogger

**Kind**: static method of [<code>slogger</code>](#slogger)  
**Returns**: this  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> |  |
| [time] | <code>String</code> | otpions.level The level of logger, it can be `time` `trace` `debug` `warn`  `error`,the default is `time`. |
| [0] | <code>Number</code> | options.flushInterval  Print the log to console in a fixed time, all logs between the interval will be cached, and then flush to console when the internal timer trigger.it only takes effect when you use custom console format. |
| [undefined] | [<code>Array.&lt;LogFileItem&gt;</code>](#LogFileItem) | options.logFiles The files to storage the log. |
| [false] | <code>Boolean</code> | options.disableTimePrefix Whether disable the time perfix. |

<a name="dateFormat"></a>

## dateFormat(date)
Format the Date to a string.

**Kind**: global function  

| Param | Type |
| --- | --- |
| date | <code>Date</code> | 

<a name="LogPrinter"></a>

## LogPrinter(options, [undefined], [false])
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.flushInterval | <code>Number</code> |  |
| [undefined] | [<code>Array.&lt;LogFileItem&gt;</code>](#LogFileItem) | options.logFiles |
| [false] | <code>Boolean</code> | options.disableTimePrefix Whether disable the time perfix. |

<a name="LogFileItem"></a>

## LogFileItem
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | The file to save the log. |
| category | <code>String</code> | The category of the log , it can be the log level, such as `debug` `info` `warn` `error`, or it can be a custom string. |

