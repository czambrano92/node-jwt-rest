let express = require('express');
let personaController = require('../controllers/persona');

let api = express.Router();

api.get('/persona/:rut', personaController.getPersona);
api.post('/persona', personaController.savePersona);


module.exports = api;