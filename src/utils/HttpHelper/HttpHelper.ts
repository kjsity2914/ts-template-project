import { HttpError } from '../Error/Error.js';

export class HttpHelper {
    static async Get<T>(url: string): Promise<T> {
        try {
            const res = await fetch(url);

            if (!res.ok) {
                throw new HttpError(`GET ${url} failed with status ${res.status}`, res.status, url);
            }

            return (await res.json()) as T;
        } catch (err) {
            console.error(`Error fetching ${url}`, err);
            throw err;
        }
    }
}
