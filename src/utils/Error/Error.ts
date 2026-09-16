export class HttpError extends Error {
    status: number;
    url: string;

    constructor(message: string, status: number, url: string, options?: { cause?: unknown }) {
        super(message, options);
        this.name = 'HttpError';
        this.status = status;
        this.url = url;

        // Required for custom errors to behave correctly in TS/JS
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
