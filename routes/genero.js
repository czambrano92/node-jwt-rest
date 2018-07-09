let express = require('express');
let generoController = require('../controllers/genero');

let api = express.Router();

api.get('/genero', generoController.getAllGenero);
api.get('/genero/:id', generoController.getGenero);


module.exports = api;