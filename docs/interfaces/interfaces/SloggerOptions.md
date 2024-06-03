[**node-slogger**](../../README.md) • **Docs**

***

[node-slogger](../../modules.md) / [interfaces](../README.md) / SloggerOptions

# Interface: SloggerOptions

## Properties

### disableLevelPrefix?

> `optional` **disableLevelPrefix**: `boolean`

Whether disable the level string prefix.

#### Source

[interfaces.ts:93](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/interfaces.ts#L93)

***

### disableTimePrefix?

> `optional` **disableTimePrefix**: `boolean`

Whether disable the time prefix.

#### Source

[interfaces.ts:89](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/interfaces.ts#L89)

***

### flushInterval?

> `optional` **flushInterval**: `number`

Print the log to console in a fixed time,
all logs between the interval will be cached, 
and then flush to console when the internal timer trigger.
it only takes effect when you use custom console format.

#### Source

[interfaces.ts:81](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/interfaces.ts#L81)

***

### level?

> `optional` **level**: [`LogLevel`](../enumerations/LogLevel.md)

The level of logger, it can be `time` `trace` `debug` `warn`  `error`,the default is `time`.

#### Source

[interfaces.ts:74](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/interfaces.ts#L74)

***

### projectName?

> `optional` **projectName**: `string`

The name of project which use slogger

#### Source

[interfaces.ts:97](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/interfaces.ts#L97)

***

### streams?

> `optional` **streams**: [`CustomSteamRecord`](../type-aliases/CustomSteamRecord.md)

The streams to storage the log

#### Source

[interfaces.ts:85](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/interfaces.ts#L85)
