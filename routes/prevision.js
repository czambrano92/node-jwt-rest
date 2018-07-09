let express = require('express');
let previsionController = require('../controllers/prevision');

let api = express.Router();

api.get('/prevision', previsionController.getPrevisiones);
api.get('/prevision/:id', previsionController.getPrevision);


module.exports = api;