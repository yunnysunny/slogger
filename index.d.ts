
export interface Slogger {
  print(level: string, ...args: any[]): void
  trace(message?: any, ...args: any[]): void
  debug(message?: any, ...args: any[]): void
  info(message?: any, ...args: any[]): void
  warn(message?: any, ...args: any[]): void
  error(message?: any, ...args: any[]): void
  time(label?: string): void
  timeEnd(label?: string): void
  flush(callback: () => void): void
}
export enum LogLevel {
  TIME = 'time',
  TRACE = 'trace',
  DEBUG = 'debug',
  WARN = 'warn',
  ERROR = 'error'
}
type LogFileItem = {
  /**
   * The file to save the log.
   */
  filename: string;
  /**
   * The category of the log , it can be the log level, such as `debug` `info` `warn` `error`, or it can be a custom string.
   */
  category: string;
};
interface KafkaProducer {
  addData(data: object): unknown
}
export type KafkaProducers = {
    /**
     * The instanceof `KafkaProducer` with function of `addData`.
     */
    producer: KafkaProducer;
    /**
     * The category of the log , it can be the log level, such as `debug` `info` `warn` `error`, or it can be a custom string.
     */
    category: string;
};
export interface SloggerOptions {
  level: LogLevel //  The level of logger, it can be `time` `trace` `debug` `warn`  `error`,the default is `time`.
  flushInterval?: number //  Print the log to console in a fixed time, all logs between the interval will be cached, and then flush to console when the internal timer trigger.it only takes effect when you use custom console format, default value is `false`.
  logFiles?: LogFileItem[] // The files to storage the log.
  producers?: KafkaProducers // The instances of QueueScheduleProducer, which used to send log to kafka.
  disableTimePrefix?: boolean // Whether disable the time prefix, default value is `false`.
  disableLevelPrefix?: boolean// Whether disable the level string prefix, default value is `false`.
  projectName?: string // The name of project which use slogger, it will be a field of data sent to logstash if you use.
}
export function init(options: SloggerOptions): Slogger
