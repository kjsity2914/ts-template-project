import type { Response } from 'express';

import { checkRequiredQueryParam } from './checkParam.js';

describe('checkParam', () => {
    let res: Response;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });

        res = {
            status: statusMock,
        } as unknown as Response;
    });

    test('returns false and sends 400 when param is missing', () => {
        const result = checkRequiredQueryParam(res, undefined, 'userId');

        expect(result).toBe(null);
        expect(statusMock).toHaveBeenCalledWith(400);
        expect(jsonMock).toHaveBeenCalledWith({
            error: 'Missing required parameter: userId',
        });
    });

    test('returns true when param is present', () => {
        const result = checkRequiredQueryParam(res, 'abc123', 'userId');

        expect(result).toBe('abc123');

        expect(statusMock).not.toHaveBeenCalled();
        expect(jsonMock).not.toHaveBeenCalled();
    });
});
