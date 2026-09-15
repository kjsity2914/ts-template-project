import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';

import { checkRequiredQueryParam } from './utils/checkParam/checkParam.js';
import { toStringParam } from './utils/toParam/toParam.js';

dotenv.config();

export async function main() {
    const app = express();
    const port = process.env.PORT || 3000;

    app.get('/hello-world', async (req: Request, res: Response) => {
        const { name } = req.query;
        const { showDatetime } = req.query;

        // Validate required parameters
        if (!checkRequiredQueryParam(res, name, 'name')) return;

        // Normalise values
        const nameStr = toStringParam(name, 'name');
        let timeStr = '';

        if (showDatetime) {
            const timestamp = new Date().getTime();
            const formattedDateTime = new Date(timestamp).toLocaleString();
            timeStr = ` currently the date and time is ${formattedDateTime}`;
        }

        try {
            const data = {
                greetings: `Hello ${nameStr}!${timeStr}`,
            };
            res.json(data);
        } catch (err) {
            console.error('Error in /hello-world', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });
}

main();
