let express = require('express');
let puebloController = require('../controllers/pueblooriginario');

let api = express.Router();

api.get('/pueblos', puebloController.getPueblos);
api.get('/pueblo/:id', puebloController.getPueblo);


module.exports = api;