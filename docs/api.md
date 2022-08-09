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
<dt><a href="#QueueScheduleProducer">QueueScheduleProducer</a></dt>
<dd></dd>
</dl>

<a name="slogger"></a>

## slogger
The slogger object.

**Kind**: global variable  

* [slogger](#slogger)
    * [.init([options])](#slogger.init) ⇒
    * [.print(level, args)](#slogger.print)
    * [.debug()](#slogger.debug)
    * [.info()](#slogger.info)
    * [.trace()](#slogger.trace)
    * [.warn()](#slogger.warn)
    * [.time(label)](#slogger.time)
    * [.timeEnd(label)](#slogger.timeEnd)
    * [.flush(callback)](#slogger.flush)

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
| [options.logFiles] | [<code>[ &#x27;Array&#x27; ].&lt;LogFileItem&gt;</code>](#LogFileItem) |  | The files to storage the log. |
| [options.producers] | [<code>[ &#x27;Array&#x27; ].&lt;QueueScheduleProducer&gt;</code>](#QueueScheduleProducer) |  | The instances of QueueScheduleProducer, which used to send log to kafka. |
| [options.disableTimePrefix] | <code>Boolean</code> | <code>false</code> | Whether disable the time perfix. |
| [options.disableLevelPrefix] | <code>Boolean</code> | <code>false</code> | Whether disble the level string prefix. |
| [options.projectName] | <code>String</code> | <code>&#x27;&#x27;</code> | The name of project which use slogger, it will be a field of data sent to logstash if you use. |

<a name="slogger.print"></a>

### slogger.print(level, args)
Print log with given level

**Kind**: static method of [<code>slogger</code>](#slogger)  

| Param | Type |
| --- | --- |
| level | <code>String</code> | 
| args | <code>Array</code> | 

<a name="slogger.debug"></a>

### slogger.debug()
Print debug log

**Kind**: static method of [<code>slogger</code>](#slogger)  
<a name="slogger.info"></a>

### slogger.info()
Print info log

**Kind**: static method of [<code>slogger</code>](#slogger)  
<a name="slogger.trace"></a>

### slogger.trace()
Print trace log

**Kind**: static method of [<code>slogger</code>](#slogger)  
<a name="slogger.warn"></a>

### slogger.warn()
Print warn log

**Kind**: static method of [<code>slogger</code>](#slogger)  
<a name="slogger.time"></a>

### slogger.time(label)
Call console.time

**Kind**: static method of [<code>slogger</code>](#slogger)  

| Param | Type |
| --- | --- |
| label | <code>String</code> | 

<a name="slogger.timeEnd"></a>

### slogger.timeEnd(label)
Call console.timeEnd

**Kind**: static method of [<code>slogger</code>](#slogger)  

| Param | Type |
| --- | --- |
| label | <code>String</code> | 

<a name="slogger.flush"></a>

### slogger.flush(callback)
Flush the log content to stdstream and filestreams.

**Kind**: static method of [<code>slogger</code>](#slogger)  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="LogFileItem"></a>

## LogFileItem
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | The file to save the log. |
| category | <code>String</code> | The category of the log , it can be the log level, such as `debug` `info` `warn` `error`, or it can be a custom string. |

<a name="QueueScheduleProducer"></a>

## QueueScheduleProducer
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| producer | <code>RdKafkaProducer</code> | The instanceof `RdKafkaProducer` from the package of `queue-schedule`. |
| category | <code>String</code> | The category of the log , it can be the log level, such as `debug` `info` `warn` `error`, or it can be a custom string. |

