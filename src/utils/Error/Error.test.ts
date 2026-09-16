import { HttpError } from './Error.js';

describe('Error', () => {
    describe('HttpError', () => {
        test('constructs with correct fields', () => {
            const err = new HttpError('this is a http error', 500, 'https://example.com');

            expect(err).toBeInstanceOf(HttpError);
            expect(err).toBeInstanceOf(Error);
            expect(err).toMatchObject({
                status: 500,
                url: 'https://example.com',
            });
        });

        test('throws and be caught as HttpError', () => {
            const throwFunction = () => {
                throw new HttpError('throw error', 500, 'https://example.com');
            };

            expect(throwFunction).toThrow(HttpError);
            expect(throwFunction).toThrow('throw error');
        });
    });
});
