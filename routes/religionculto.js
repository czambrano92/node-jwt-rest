let express = require('express');
let religionCultoController = require('../controllers/religionculto');

let api = express.Router();

api.get('/religionculto', religionCultoController.getAllReligionCulto);
api.get('/religionculto/:id', religionCultoController.getReligionCulto);


module.exports = api;