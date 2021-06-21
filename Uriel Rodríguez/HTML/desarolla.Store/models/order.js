const mongoose = require('mongoose');

//Generar nuestro propio módulo
module.exports = mongoose.model( 'Order', new mongoose.Schema({
    ID: Number,
    status: String,
    address: {
        street: String,
        suburb: String,
        city: String,
        state: String,
        zip: Number
    },
    email: String,
    phone: Number,
    details: {
        products: Array,
        total: Number
    }
}), 'Orders' );