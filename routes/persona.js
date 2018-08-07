let express = require('express');
let personaController = require('../controllers/persona');

let api = express.Router();

api.get('/persona/:uid', personaController.getPersona);
api.get('/persona/:uid/:identificador', personaController.getPersonaByIdentificador);
api.post('/persona', personaController.savePersona);
api.put('/persona', personaController.updatePersona);


module.exports = api;