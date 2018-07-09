let express = require('express');
let provinciaController = require('../controllers/provincia');

let api = express.Router();

api.get('/provincia', provinciaController.getProvincias);
api.get('/provincia/:id', provinciaController.getProvincia);

module.exports = api;