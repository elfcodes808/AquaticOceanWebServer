const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let rankQueue = [];

app.post('/rank-user', (req, res) => {
    const { userId, rankId } = req.body;
    if (!userId || !rankId) {
        return res.status(400).json({ success: false, message: "Missing userId or rankId" });
    }
    rankQueue.push({ userId, rankId });
    console.log(`Queued rank request for UserId: ${userId} to Rank: ${rankId}`);
    res.json({ success: true, message: "Rank request queued successfully." });
});

app.get('/pending-requests', (req, res) => {
    const pending = [...rankQueue];
    rankQueue = []; // Clear the queue after sending to bot
    res.json(pending);
});

app.listen(PORT, () => console.log(`Webhook API running on port ${PORT}`));
