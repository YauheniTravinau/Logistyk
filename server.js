const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about', 'about.html'));
});


app.get('/reviews', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'reviews', 'reviews.html'));
});

app.get('/translations', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'translations', 'translations.html'));
});

app.get('/shop', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'shop', 'shop.html'));
});

app.get('/payment-and-delivery', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'payment-and-delivery', 'payment-and-delivery.html'));
});

// Добавьте обработчики для других страниц здесь

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
