import type { Response } from 'express';
import { mock } from 'jest-mock-extended';

import { checkISODateQueryParam, checkRequiredQueryParam } from './checkParam.js';

describe('checkParam', () => {
    let res: Response;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });

        res = mock<Response>({
            status: statusMock,
        });
    });

    describe('checkRequiredQueryParam', () => {
        test('returns null and sends 400 when param is missing', () => {
            const result = checkRequiredQueryParam(res, undefined, 'userId');

            expect(result).toBe(null);
            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith({
                error: 'Missing required parameter: userId',
            });
        });

        test('returns abc123 when param is present', () => {
            const result = checkRequiredQueryParam(res, 'abc123', 'userId');

            expect(result).toBe('abc123');
            expect(statusMock).not.toHaveBeenCalled();
            expect(jsonMock).not.toHaveBeenCalled();
        });
    });

    describe('checkISODateQueryParam', () => {
        test('returns null and sends 400 when param is missing', () => {
            const result = checkISODateQueryParam(res, undefined, 'dateTime');

            expect(result).toBe(null);
            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith({
                error: 'Missing required parameter: dateTime',
            });
        });

        test('returns null and sends 400 when param is not a string', () => {
            const result = checkISODateQueryParam(res, 123, 'dateTime');

            expect(result).toBe(null);
            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith({
                error: 'dateTime must be a string',
            });
        });

        test('returns null and sends 400 when param is not in correct format', () => {
            const result = checkISODateQueryParam(res, '2026-4-6', 'dateTime');

            expect(result).toBe(null);
            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith({
                error: 'dateTime must be in YYYY-MM-DD format',
            });
        });

        test('returns null and sends 400 when param is not a valid date', () => {
            const result = checkISODateQueryParam(res, '2026-99-99', 'dateTime');

            expect(result).toBe(null);
            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith({
                error: 'dateTime must be a valid date',
            });
        });

        test('returns null and sends 400 when param is not a valid calandar date', () => {
            const result = checkISODateQueryParam(res, '2026-02-29', 'dateTime');

            expect(result).toBe(null);
            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith({
                error: 'dateTime must be a valid calendar date',
            });
        });
    });
});
