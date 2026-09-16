import { HttpError } from '../Error/Error.js';
import { HttpHelper } from './HttpHelper.js';

describe('HttpHelper', () => {
    describe('when res.ok is true', () => {
        const originalFetch = globalThis.fetch;

        beforeEach(() => {
            globalThis.fetch = jest.fn().mockReturnValue({
                ok: true,
                json: async () => ({ status: 'ok' }),
            });
        });

        afterEach(() => {
            globalThis.fetch = originalFetch;
        });

        test('Get should return ok status', async () => {
            const result = await HttpHelper.Get('http://example.com');

            expect(result).toEqual({ status: 'ok' });
        });
    });
    describe('when res.ok is false', () => {
        const originalFetch = globalThis.fetch;
        let spy: jest.SpyInstance;

        beforeEach(() => {
            spy = jest.spyOn(console, 'error').mockImplementation(() => {});

            globalThis.fetch = jest.fn().mockReturnValue({
                ok: false,
                status: 500,
            });
        });

        afterEach(() => {
            globalThis.fetch = originalFetch;
            spy.mockRestore();
        });
        test('Get should throw HttpError with correct values', async () => {
            await expect(HttpHelper.Get('http://example.com')).rejects.toThrow();

            try {
                await HttpHelper.Get('http://example.com');
            } catch (err) {
                if (err instanceof HttpError) {
                    expect(err.status).toEqual(500);
                    expect(err.url).toEqual('http://example.com');
                } else {
                    expect(err).toBeInstanceOf(HttpError);
                }
            }
        });
    });
});
