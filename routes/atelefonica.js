let express = require('express');
let agendaController = require('../controllers/atelefonica');

let api = express.Router();


api.get('/atelefonica/:id_persona', agendaController.getAgenda);


module.exports = api;