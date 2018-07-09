let express = require('express');
let nivelinstruccionController = require('../controllers/nivelinstruccion');

let api = express.Router();

api.get('/nivelinstruccion', nivelinstruccionController.getNivelesInstruccion);
api.get('/nivelinstruccion/:id', nivelinstruccionController.getNivelInstruccion);


module.exports = api;