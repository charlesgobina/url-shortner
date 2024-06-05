
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// In-memory storage for URLs
const urlDatabase = {};

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    const { nanoid } = await import('nanoid');
    const shortId = nanoid(6);
    urlDatabase[shortId] = originalUrl;
    res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortId}` });
});

app.get('/:shortId', (req, res) => {
    const { shortId } = req.params;
    const originalUrl = urlDatabase[shortId];
    if (originalUrl) {
        res.redirect(originalUrl);
    } else {
        res.status(404).send('URL not found');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
