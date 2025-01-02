const express = require('express');
const app = express();
const port = 3000;

let messages = []; // Store messages in-memory (this will reset on server restart)

// Use middleware to serve static files (like HTML and JS)
app.use(express.static('public'));
app.use(express.json()); // For parsing JSON payloads

// Endpoint to send messages (POST request)
app.post('/send', (req, res) => {
    const message = req.body.message;
    if (message) {
        messages.push(message);  // Save the message to the in-memory array
        res.status(200).json({ status: 'Message received' });
    } else {
        res.status(400).json({ error: 'No message provided' });
    }
});

// Endpoint to get all messages (GET request)
app.get('/messages', (req, res) => {
    res.status(200).json({ messages: messages });  // Return the stored messages
});

// Start the server
app.listen(port, () => {
    console.log(`HTTP server running on http://13.233.206.2:${port}`);
});
