let express = require('express');
let comunaController = require('../controllers/comuna');

let api = express.Router();

api.get('/comunas', comunaController.getComunas);
api.get('/comuna/:id', comunaController.getComuna);


module.exports = api;