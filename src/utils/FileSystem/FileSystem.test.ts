import { existsSync, readFileSync, writeFileSync } from 'fs';

import { FileSystem } from './FileSystem.js';

jest.mock('fs', () => ({
    existsSync: jest.fn(),
    readFileSync: jest.fn(),
    writeFileSync: jest.fn(),
}));

describe('FileSystem', () => {
    const mockExists = existsSync as jest.Mock;
    const mockRead = readFileSync as jest.Mock;
    const mockWrite = writeFileSync as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    describe('ReadFileSync', () => {
        test('reads and parses JSON file', () => {
            mockRead.mockReturnValue('{"name":"Foobar"}');

            const result = FileSystem.ReadFileSync<{ name: string }>('/path/to/file.json');

            expect(mockRead).toHaveBeenCalledWith('/path/to/file.json', 'utf-8');
            expect(result).toEqual({ name: 'Foobar' });
        });

        test('logs and rethrows when readFileSync fails', () => {
            mockRead.mockImplementation(() => {
                throw new Error('read error');
            });

            expect(() => FileSystem.ReadFileSync('/sqLite/bazqux.db')).toThrow('read error');

            expect(console.error).toHaveBeenCalledWith('Error reading file', expect.any(Error));
        });
    });

    describe('FileExistsSync', () => {
        test('returns true when file exists', () => {
            mockExists.mockReturnValue(true);

            const result = FileSystem.FileExistsSync('/path/to/file');

            expect(result).toBe(true);
            expect(mockExists).toHaveBeenCalledWith('/path/to/file');
        });

        test('returns false when file does not exist', () => {
            mockExists.mockReturnValue(false);

            const result = FileSystem.FileExistsSync('/path/to/file');

            expect(result).toBe(false);
            expect(mockExists).toHaveBeenCalledWith('/path/to/file');
        });
    });

    describe('WriteFileSync', () => {
        test('writes file successfully', () => {
            FileSystem.WriteFileSync('/path/to/file', 'quuz');

            expect(mockWrite).toHaveBeenCalledWith('/path/to/file', 'quuz');
        });

        test('logs and rethrows when writeFileSync fails', () => {
            mockWrite.mockImplementation(() => {
                throw new Error('write error');
            });

            expect(() => FileSystem.WriteFileSync('/path/to/file', 'quuz')).toThrow('write error');

            expect(console.error).toHaveBeenCalledWith('Error writing file', expect.any(Error));
        });
    });
});
