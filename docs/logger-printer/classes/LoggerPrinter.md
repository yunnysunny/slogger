[**node-slogger**](../../README.md) • **Docs**

***

[node-slogger](../../modules.md) / [logger-printer](../README.md) / LoggerPrinter

# Class: LoggerPrinter

## Constructors

### new LoggerPrinter()

> **new LoggerPrinter**(`options`): [`LoggerPrinter`](LoggerPrinter.md)

#### Parameters

• **options**: [`SloggerOptions`](../../interfaces/interfaces/SloggerOptions.md)

#### Returns

[`LoggerPrinter`](LoggerPrinter.md)

#### Source

[logger-printer.ts:61](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/logger-printer.ts#L61)

## Properties

### \_disableLevelPrefix?

> `private` `optional` `readonly` **\_disableLevelPrefix**: `boolean`

#### Source

[logger-printer.ts:56](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/logger-printer.ts#L56)

***

### \_disableTimePrefix?

> `private` `optional` `readonly` **\_disableTimePrefix**: `boolean`

#### Source

[logger-printer.ts:55](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/logger-printer.ts#L55)

***

### \_flushInterval

> `private` `readonly` **\_flushInterval**: `number`

#### Source

[logger-printer.ts:53](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/logger-printer.ts#L53)

***

### \_logCache

> `private` **\_logCache**: `string`

#### Source

[logger-printer.ts:54](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/logger-printer.ts#L54)

***

### \_projectName?

> `private` `optional` `readonly` **\_projectName**: `string`

#### Source

[logger-printer.ts:58](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/logger-printer.ts#L58)

***

### customStreamLen

> `private` `readonly` **customStreamLen**: `number`

#### Source

[logger-printer.ts:57](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/logger-printer.ts#L57)

***

### customStreams?

> `private` `optional` `readonly` **customStreams**: [`CustomSteamRecord`](../../interfaces/type-aliases/CustomSteamRecord.md)

#### Source

[logger-printer.ts:59](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/logger-printer.ts#L59)

***

### customStreamsCache

> `private` `readonly` **customStreamsCache**: `Map`\<[`NormalLevel`](../../interfaces/type-aliases/NormalLevel.md), `string`\>

#### Source

[logger-printer.ts:60](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/logger-printer.ts#L60)

## Accessors

### logCache

> `get` **logCache**(): `string`

#### Returns

`string`

#### Source

[logger-printer.ts:140](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/logger-printer.ts#L140)

## Methods

### flush()

> **flush**(`callback`?): `void`

Flush the log content to std stream and custom streams.

#### Parameters

• **callback?**: `Function`

#### Returns

`void`

#### Source

[logger-printer.ts:126](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/logger-printer.ts#L126)

***

### flushCustomStream()

> `private` **flushCustomStream**(`callback`?): `void`

#### Parameters

• **callback?**: `Function`

#### Returns

`void`

#### Source

[logger-printer.ts:94](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/logger-printer.ts#L94)

***

### flushLog()

> `private` **flushLog**(): `void`

#### Returns

`void`

#### Source

[logger-printer.ts:148](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/logger-printer.ts#L148)

***

### getStreamCache()

> **getStreamCache**(`level`): `string`

#### Parameters

• **level**: [`NormalLevel`](../../interfaces/type-aliases/NormalLevel.md)

#### Returns

`string`

#### Source

[logger-printer.ts:144](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/logger-printer.ts#L144)

***

### print()

> **print**(`args`, `level`): `void`

#### Parameters

• **args**: `unknown`[]

• **level**: [`NormalLevel`](../../interfaces/type-aliases/NormalLevel.md)

#### Returns

`void`

#### Source

[logger-printer.ts:160](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/logger-printer.ts#L160)

***

### writeToStream()

> `private` **writeToStream**(`stream`, `value`, `callback`?): `void`

#### Parameters

• **stream**: `Writable`

• **value**: `string`

• **callback?**

#### Returns

`void`

#### Source

[logger-printer.ts:81](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/logger-printer.ts#L81)
