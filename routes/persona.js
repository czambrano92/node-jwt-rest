let express = require('express');
let personaController = require('../controllers/persona');

let api = express.Router();

api.get('/personas', personaController.getPersonas);


module.exports = api;