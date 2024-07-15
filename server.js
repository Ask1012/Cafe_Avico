const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

let orders = [];

app.post('/order', (req, res) => {
    orders.unshift(req.body); // Add new order at the beginning
    res.status(200).json({ message: 'Order received' });
});

app.get('/order', (req, res) => {
    res.status(200).json(orders); // Return orders as is, now ordered with the most recent first
});

app.use(express.static('public'));

// Serve index.html as the default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve kitchen.html
app.get('/kitchen', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'kitchen.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
