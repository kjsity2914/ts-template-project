import {
    toOptionalNumberParam,
    toOptionalStringParam,
    toStringArrayParam,
    toStringParam,
} from './toParam.js';

describe('toParam', () => {
    test('returns string directly', () => {
        expect(toStringParam('foo', 'bar')).toBe('foo');
    });

    test('returns first element of array', () => {
        expect(toStringParam(['foo', 'bar'], 'baz')).toBe('foo');
    });

    test('throws on invalid type', () => {
        expect(() => toStringParam(123, 'foo')).toThrow('foo has an invalid query parameter type');
    });
});

describe('toStringArrayParam', () => {
    test('splits string into array', () => {
        expect(toStringArrayParam('foo,bar,baz', 'param')).toEqual(['foo', 'bar', 'baz']);
    });

    test('splits first element of array', () => {
        expect(toStringArrayParam(['foo,bar,baz'], 'param')).toEqual(['foo', 'bar', 'baz']);
    });

    test('trims whitespace', () => {
        expect(toStringArrayParam(' foo, bar ,baz ', 'param')).toEqual(['foo', 'bar', 'baz']);
    });

    test('removes empty indexes', () => {
        expect(toStringArrayParam('foo, bar, baz,', 'param')).toEqual(['foo', 'bar', 'baz']);
    });

    test('throws on invalid type', () => {
        expect(() => toStringArrayParam(1, 'foo')).toThrow(
            'foo has an invalid query parameter type',
        );
    });
});

describe('toOptionalStringParam', () => {
    test('returns string directly', () => {
        expect(toOptionalStringParam('foo', 'bar')).toBe('foo');
    });

    test('returns first element of array', () => {
        expect(toOptionalStringParam(['foo', 'bar'], 'param')).toBe('foo');
    });

    test('returns undefined when param is undefined', () => {
        expect(toOptionalStringParam(undefined, 'foo')).toBeUndefined();
    });

    test('throws on invalid type', () => {
        expect(() => toOptionalStringParam(123, 'foo')).toThrow(
            'foo has an invalid query parameter type',
        );
    });
});

describe('toOptionalNumberParam', () => {
    test('returns undefined when param is undefined', () => {
        expect(toOptionalNumberParam(undefined, 'param')).toBeUndefined();
    });

    test('parses string number', () => {
        expect(toOptionalNumberParam('1', 'param')).toBe(1);
    });

    test('parses first element of array', () => {
        expect(toOptionalNumberParam(['2'], 'param')).toBe(2);
    });

    test('throws when non-numeric string is provided', () => {
        expect(() => toOptionalNumberParam('foo', 'bar')).toThrow('bar must be a positive integer');
    });

    test('throws when array contains non-numeric string', () => {
        expect(() => toOptionalNumberParam(['foo'], 'bar')).toThrow(
            'bar must be a positive integer',
        );
    });

    test('throws on invalid type', () => {
        expect(() => toOptionalNumberParam({}, 'foo')).toThrow(
            'foo has an invalid query parameter type',
        );
    });
});
