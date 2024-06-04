[**node-slogger**](../../index.md) • **Docs**

***

[node-slogger](../../modules.md) / [logger-printer](../index.md) / LoggerPrinter

# Class: LoggerPrinter

## Constructors

### new LoggerPrinter()

> **new LoggerPrinter**(`options`): [`LoggerPrinter`](LoggerPrinter.md)

#### Parameters

• **options**: [`SloggerOptions`](../../interfaces/interfaces/SloggerOptions.md)

#### Returns

[`LoggerPrinter`](LoggerPrinter.md)

#### Source

[logger-printer.ts:63](https://github.com/yunnysunny/slogger/blob/ab2000b987700b29e0d0fb17448f8d5322ccef45/src/logger-printer.ts#L63)

## Properties

### \_disableLevelPrefix?

> `private` `optional` `readonly` **\_disableLevelPrefix**: `boolean`

#### Source

[logger-printer.ts:57](https://github.com/yunnysunny/slogger/blob/ab2000b987700b29e0d0fb17448f8d5322ccef45/src/logger-printer.ts#L57)

***

### \_disableTimePrefix?

> `private` `optional` `readonly` **\_disableTimePrefix**: `boolean`

#### Source

[logger-printer.ts:56](https://github.com/yunnysunny/slogger/blob/ab2000b987700b29e0d0fb17448f8d5322ccef45/src/logger-printer.ts#L56)

***

### \_flushInterval

> `private` `readonly` **\_flushInterval**: `number`

#### Source

[logger-printer.ts:54](https://github.com/yunnysunny/slogger/blob/ab2000b987700b29e0d0fb17448f8d5322ccef45/src/logger-printer.ts#L54)

***

### \_logCache

> `private` **\_logCache**: `string`

#### Source

[logger-printer.ts:55](https://github.com/yunnysunny/slogger/blob/ab2000b987700b29e0d0fb17448f8d5322ccef45/src/logger-printer.ts#L55)

***

### \_projectName?

> `private` `optional` `readonly` **\_projectName**: `string`

#### Source

[logger-printer.ts:59](https://github.com/yunnysunny/slogger/blob/ab2000b987700b29e0d0fb17448f8d5322ccef45/src/logger-printer.ts#L59)

***

### customStreamLen

> `private` `readonly` **customStreamLen**: `number`

#### Source

[logger-printer.ts:58](https://github.com/yunnysunny/slogger/blob/ab2000b987700b29e0d0fb17448f8d5322ccef45/src/logger-printer.ts#L58)

***

### customStreams?

> `private` `optional` `readonly` **customStreams**: [`CustomSteamRecord`](../../interfaces/type-aliases/CustomSteamRecord.md)

#### Source

[logger-printer.ts:60](https://github.com/yunnysunny/slogger/blob/ab2000b987700b29e0d0fb17448f8d5322ccef45/src/logger-printer.ts#L60)

***

### customStreamsCache

> `private` `readonly` **customStreamsCache**: `Map`\<[`NormalLevel`](../../interfaces/type-aliases/NormalLevel.md), `string`\>

#### Source

[logger-printer.ts:61](https://github.com/yunnysunny/slogger/blob/ab2000b987700b29e0d0fb17448f8d5322ccef45/src/logger-printer.ts#L61)

***

### newLineSeparator

> `private` `readonly` **newLineSeparator**: `string` = `'\n'`

#### Source

[logger-printer.ts:62](https://github.com/yunnysunny/slogger/blob/ab2000b987700b29e0d0fb17448f8d5322ccef45/src/logger-printer.ts#L62)

## Accessors

### logCache

> `get` **logCache**(): `string`

#### Returns

`string`

#### Source

[logger-printer.ts:143](https://github.com/yunnysunny/slogger/blob/ab2000b987700b29e0d0fb17448f8d5322ccef45/src/logger-printer.ts#L143)

## Methods

### flush()

> **flush**(`callback`?): `void`

Flush the log content to std stream and custom streams.

#### Parameters

• **callback?**: `Function`

#### Returns

`void`

#### Source

[logger-printer.ts:129](https://github.com/yunnysunny/slogger/blob/ab2000b987700b29e0d0fb17448f8d5322ccef45/src/logger-printer.ts#L129)

***

### flushCustomStream()

> `private` **flushCustomStream**(`callback`?): `void`

#### Parameters

• **callback?**: `Function`

#### Returns

`void`

#### Source

[logger-printer.ts:97](https://github.com/yunnysunny/slogger/blob/ab2000b987700b29e0d0fb17448f8d5322ccef45/src/logger-printer.ts#L97)

***

### flushLog()

> `private` **flushLog**(): `void`

#### Returns

`void`

#### Source

[logger-printer.ts:151](https://github.com/yunnysunny/slogger/blob/ab2000b987700b29e0d0fb17448f8d5322ccef45/src/logger-printer.ts#L151)

***

### getStreamCache()

> **getStreamCache**(`level`): `string`

#### Parameters

• **level**: [`NormalLevel`](../../interfaces/type-aliases/NormalLevel.md)

#### Returns

`string`

#### Source

[logger-printer.ts:147](https://github.com/yunnysunny/slogger/blob/ab2000b987700b29e0d0fb17448f8d5322ccef45/src/logger-printer.ts#L147)

***

### print()

> **print**(`args`, `level`): `void`

#### Parameters

• **args**: `unknown`[]

• **level**: [`NormalLevel`](../../interfaces/type-aliases/NormalLevel.md)

#### Returns

`void`

#### Source

[logger-printer.ts:163](https://github.com/yunnysunny/slogger/blob/ab2000b987700b29e0d0fb17448f8d5322ccef45/src/logger-printer.ts#L163)

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

[logger-printer.ts:84](https://github.com/yunnysunny/slogger/blob/ab2000b987700b29e0d0fb17448f8d5322ccef45/src/logger-printer.ts#L84)
