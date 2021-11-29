const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: String,
    symbol: String,
    image: String,
    current_price: Number,
    market_cap: Number
});

const Crypto = mongoose.model("CURRENCY",cryptoSchema);

module.exports = Crypto;