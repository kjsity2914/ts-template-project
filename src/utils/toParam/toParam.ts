export function toStringParam(param: unknown, name: string): string {
    if (typeof param === 'string') return param;

    if (Array.isArray(param)) return param[0];

    throw new Error(`${name} has an invalid query parameter type`);
}

export function toStringArrayParam(param: unknown, name: string): string[] {
    let stringParam: string;
    if (typeof param === 'string') stringParam = param;
    else if (Array.isArray(param)) stringParam = param[0];
    else throw new Error(`${name} has an invalid query parameter type`);

    return stringParam
        .split(',')
        .map((p) => p.trim())
        .filter((p) => p.length > 0);
}

export function toOptionalStringParam(param: unknown, name: string): string | undefined {
    if (typeof param === 'string') return param;

    if (Array.isArray(param)) return param[0];

    if (param === undefined) return undefined;

    throw new Error(`${name} has an invalid query parameter type`);
}

export function toOptionalNumberParam(param: unknown, name: string): number | undefined {
    if (param === undefined) return undefined;

    let stringParam;

    if (typeof param === 'string') stringParam = param;
    else if (Array.isArray(param)) stringParam = param[0];
    else throw new Error(`${name} has an invalid query parameter type`);

    if (isNumeric(stringParam)) return Number.parseInt(stringParam);
    else throw new Error(`${name} must be a positive integer`);
}

export function toISODateParam(param: unknown, name: string): Date {
    if (typeof param !== 'string') throw new Error(`${name} must be a string`);

    // Strict YYYY-MM-DD format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(param)) throw new Error(`${name} must be in YYYY-MM-DD format`);

    // JS must be able to parse it
    const parsedDate = new Date(param);
    if (Number.isNaN(parsedDate.getTime())) throw new Error(`${name} must be a valid date`);

    // JS must NOT auto-correct invalid dates
    const [y, m, d] = param.split('-').map(Number);
    if (!(
        parsedDate.getUTCFullYear() === y &&
        parsedDate.getUTCMonth() + 1 === m &&
        parsedDate.getUTCDate() === d
    ))
        throw new Error(`${name} must be a valid calendar date`);

    return parsedDate;
}

function isNumeric(str: string): boolean {
    return /^[0-9]+$/.test(str);
}
