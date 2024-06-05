import { nanoid } from 'nanoid';
import urlDatabase from './urlDatabase'; // You'll need to create a separate module to handle the in-memory database

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { originalUrl } = req.body;
        const shortId = nanoid(6);
        urlDatabase[shortId] = originalUrl;
        res.json({ shortUrl: `${req.headers.origin}/${shortId}` });
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
