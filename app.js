'use strict'
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//carga de rutas
//ej:
const RUTA_PERSONA = require('./routes/persona');
const RUTA_COMUNA = require('./routes/comuna');
const RUTA_NIVELINSTRUCCION = require('./routes/nivelinstruccion');
const RUTA_PUEBLOORIGINARIO = require('./routes/pueblooriginario');
const RUTA_GRUPOSANGUINEO = require('./routes/gruposanguineo');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//config cabeceras
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');
    
    next();
});
//rutas base
//ej
app.use('/api',RUTA_PERSONA);
app.use('/api',RUTA_COMUNA);
app.use('/api',RUTA_NIVELINSTRUCCION);
app.use('/api',RUTA_PUEBLOORIGINARIO);
app.use('/api',RUTA_GRUPOSANGUINEO);

module.exports = app;
