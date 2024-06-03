[**node-slogger**](../../README.md) • **Docs**

***

[node-slogger](../../modules.md) / [index](../README.md) / Slogger

# Class: Slogger

## Constructors

### new Slogger()

> **new Slogger**(`options`?): [`Slogger`](Slogger.md)

#### Parameters

• **options?**: [`SloggerOptions`](../../interfaces/interfaces/SloggerOptions.md)

#### Returns

[`Slogger`](Slogger.md)

#### Source

[index.ts:9](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/index.ts#L9)

## Properties

### \_printer

> `private` `readonly` **\_printer**: [`LoggerPrinter`](../../logger-printer/classes/LoggerPrinter.md)

#### Source

[index.ts:7](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/index.ts#L7)

***

### levelValue

> `private` `readonly` **levelValue**: `number`

#### Source

[index.ts:6](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/index.ts#L6)

## Accessors

### printer

> `get` **printer**(): [`LoggerPrinter`](../../logger-printer/classes/LoggerPrinter.md)

#### Returns

[`LoggerPrinter`](../../logger-printer/classes/LoggerPrinter.md)

#### Source

[index.ts:22](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/index.ts#L22)

## Methods

### debug()

> **debug**(...`args`): `void`

Print debug log

#### Parameters

• ...**args**: `unknown`[]

#### Returns

`void`

#### Source

[index.ts:38](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/index.ts#L38)

***

### error()

> **error**(...`args`): `void`

#### Parameters

• ...**args**: `unknown`[]

#### Returns

`void`

#### Source

[index.ts:66](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/index.ts#L66)

***

### flush()

> **flush**(`callback`): `void`

Flush the log content to std stream and custom stream.

#### Parameters

• **callback**: `Function`

#### Returns

`void`

#### Source

[index.ts:100](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/index.ts#L100)

***

### info()

> **info**(...`args`): `void`

Print info log

#### Parameters

• ...**args**: `unknown`[]

#### Returns

`void`

#### Source

[index.ts:45](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/index.ts#L45)

***

### print()

> **print**(`level`, ...`args`): `void`

Print log with given level

#### Parameters

• **level**: [`NormalLevel`](../../interfaces/type-aliases/NormalLevel.md)

• ...**args**: `unknown`[]

#### Returns

`void`

#### Source

[index.ts:29](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/index.ts#L29)

***

### time()

> **time**(`label`): `void`

Call console.time

#### Parameters

• **label**: `string`

#### Returns

`void`

#### Source

[index.ts:76](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/index.ts#L76)

***

### timeEnd()

> **timeEnd**(`label`): `void`

Call console.timeEnd

#### Parameters

• **label**: `string`

#### Returns

`void`

#### Source

[index.ts:88](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/index.ts#L88)

***

### trace()

> **trace**(...`args`): `void`

Print trace log

#### Parameters

• ...**args**: `unknown`[]

#### Returns

`void`

#### Source

[index.ts:53](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/index.ts#L53)

***

### warn()

> **warn**(...`args`): `void`

Print warn log

#### Parameters

• ...**args**: `unknown`[]

#### Returns

`void`

#### Source

[index.ts:61](https://github.com/yunnysunny/slogger/blob/c316c2f81f4f3f44e3c58ccfee459eae1daf4268/src/index.ts#L61)
