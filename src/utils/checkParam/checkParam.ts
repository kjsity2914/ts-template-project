import type { Response } from 'express';

export function checkRequiredQueryParam(res: Response, param: unknown, name: string) {
    if (!param) {
        res.status(400).json({ error: `Missing required parameter: ${name}` });
        return null;
    }

    return param;
}

export function checkISODateQueryParam(res: Response, param: unknown, name: string) {
    if (!param) {
        res.status(400).json({ error: `Missing required parameter: ${name}` });
        return null;
    }

    if (typeof param !== 'string') {
        res.status(400).json({ error: `${name} must be a string` });
        return null;
    }

    // Strict YYYY-MM-DD format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(param)) {
        res.status(400).json({ error: `${name} must be in YYYY-MM-DD format` });
        return null;
    }

    // JS must be able to parse it
    const parsedDate = new Date(param);
    if (Number.isNaN(parsedDate.getTime())) {
        res.status(400).json({ error: `${name} must be a valid date` });
        return null;
    }

    // JS must NOT auto-correct invalid dates
    const [y, m, d] = param.split('-').map(Number);
    if (!(
        parsedDate.getUTCFullYear() === y &&
        parsedDate.getUTCMonth() + 1 === m &&
        parsedDate.getUTCDate() === d
    )) {
        res.status(400).json({ error: `${name} must be a valid calendar date` });
        return null;
    }

    return param;
}
