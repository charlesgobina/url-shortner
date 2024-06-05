import urlDatabase from './urlDatabase';

export default async function handler(req, res) {
    const { shortId } = req.query;
    const originalUrl = urlDatabase[shortId];
    if (originalUrl) {
        res.writeHead(302, { Location: originalUrl });
        res.end();
    } else {
        res.status(404).send('URL not found');
    }
}
