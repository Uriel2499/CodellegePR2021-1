const mongoose = require('mongoose');
const { stringify } = require('node:querystring');

//Generar nuestro propio módulo
module.exports = mongoose.model( 'Examen', new mongoose.Schema({
    name: String,
    preguntas: Array,
    cal: Number
}), 'Examenes' );