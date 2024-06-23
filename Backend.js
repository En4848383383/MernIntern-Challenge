// server.js
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/transactions', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const transactionSchema = new mongoose.Schema({
    dateOfSale: Date,
    title: String,
    description: String,
    price: Number,
    sold: Boolean,
    category: String
});

const Transaction = mongoose.model('Transaction', transactionSchema);

app.get('/init', async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        await Transaction.deleteMany({});
        await Transaction.insertMany(response.data);
        res.send('Database initialized');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Define other APIs here

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
