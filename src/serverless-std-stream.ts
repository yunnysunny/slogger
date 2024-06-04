import { Writable } from 'node:stream';
export class ServerlessStdStream extends Writable {
    _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null | undefined) => void): void {
        console.log(chunk.toString());
        callback();
    }
}