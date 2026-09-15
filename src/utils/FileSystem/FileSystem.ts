import {
    existsSync,
    type PathLike,
    type PathOrFileDescriptor,
    readFileSync,
    writeFileSync,
} from 'fs';

export class FileSystem {
    static ReadFileSync<T>(filePath: string): T {
        try {
            const fileRaw = readFileSync(filePath, 'utf-8');

            return JSON.parse(fileRaw) as T;
        } catch (err) {
            console.error('Error reading file', err);
            throw err;
        }
    }

    static FileExistsSync(filePath: PathLike): boolean {
        return existsSync(filePath);
    }

    static WriteFileSync(file: PathOrFileDescriptor, data: string): void {
        try {
            writeFileSync(file, data);
        } catch (err) {
            console.error('Error writing file', err);
            throw err;
        }
    }
}
