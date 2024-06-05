const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

// In-memory storage for URLs
const urlDatabase = {};

app.use(express.json());

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    const { nanoid } = await import('nanoid');
    const shortId = nanoid(6);
    urlDatabase[shortId] = originalUrl;
    res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortId}` });
});

router.get('/:shortId', (req, res) => {
    const { shortId } = req.params;
    const originalUrl = urlDatabase[shortId];
    if (originalUrl) {
        res.redirect(originalUrl);
    } else {
        res.status(404).send('URL not found');
    }
});

app.use('/', router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

