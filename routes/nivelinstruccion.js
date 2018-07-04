let express = require('express');
let nivelinstruccionController = require('../controllers/nivelinstruccion');

let api = express.Router();

api.get('/nivelesinstruccion', nivelinstruccionController.getNivelesInstruccion);
api.get('/nivelesinstruccion/:id', nivelinstruccionController.getNivelInstruccion);


module.exports = api;