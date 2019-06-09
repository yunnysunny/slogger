## Members

<dl>
<dt><a href="#slogger">slogger</a></dt>
<dd><p>The slogger object.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#LogFileItem">LogFileItem</a></dt>
<dd></dd>
<dt><a href="#LogstashItem">LogstashItem</a></dt>
<dd></dd>
</dl>

<a name="slogger"></a>

## slogger
The slogger object.

**Kind**: global variable  
<a name="slogger.init"></a>

### slogger.init([options]) ⇒
Init slogger

**Kind**: static method of [<code>slogger</code>](#slogger)  
**Returns**: this  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  |  |
| [otpions.level] | <code>String</code> | <code>time</code> | The level of logger, it can be `time` `trace` `debug` `warn`  `error`,the default is `time`. |
| [options.flushInterval] | <code>Number</code> | <code>0</code> | Print the log to console in a fixed time, all logs between the interval will be cached, and then flush to console when the internal timer trigger.it only takes effect when you use custom console format. |
| [options.logFiles] | [<code>Array.&lt;LogFileItem&gt;</code>](#LogFileItem) |  | The files to storage the log. |
| [options.logstashes] | [<code>Array.&lt;LogstashItem&gt;</code>](#LogstashItem) |  | The logstash server config. |
| [options.disableTimePrefix] | <code>Boolean</code> | <code>false</code> | Whether disable the time perfix. |
| [options.projectName] | <code>String</code> | <code>&#x27;&#x27;</code> | The name of project which use slogger, it will be a field of data sent to logstash if you use. |

<a name="LogFileItem"></a>

## LogFileItem
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | The file to save the log. |
| category | <code>String</code> | The category of the log , it can be the log level, such as `debug` `info` `warn` `error`, or it can be a custom string. |

<a name="LogstashItem"></a>

## LogstashItem
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| server | <code>Logstash</code> | The `Logstash` server. |
| category | <code>String</code> | The category of the log , it can be the log level, such as `debug` `info` `warn` `error`, or it can be a custom string. |

