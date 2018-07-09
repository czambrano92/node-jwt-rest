let express = require('express');
let establecimientoRedController = require('../controllers/establecimientored');

let api = express.Router();

api.get('/establecimientored', establecimientoRedController.getAllEstablecimientoRed);
api.get('/establecimientored/:id', establecimientoRedController.getEstablecimientoRed);


module.exports = api;