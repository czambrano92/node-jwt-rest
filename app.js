'use strict'
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var jwt = require('jsonwebtoken');
const secret = 'ilovecesar';

//carga de rutas

const RUTA_AGENDATELEFONICA = require('./routes/atelefonica');
const RUTA_CADIRECCION = require('./routes/catalogodireccion');
const RUTA_CATOCUPACIONAL = require('./routes/categoriaocupacional');
const RUTA_CLAFONASA = require('./routes/clasificacionfonasa');
const RUTA_CODIRECCION = require('./routes/complementodireccion');
const RUTA_COMUNA = require('./routes/comuna');
const RUTA_ESTABLECIMIENTORED = require('./routes/establecimientored');
const RUTA_ESTADOCIVIL = require('./routes/estadocivil');
const RUTA_FICHA = require('./routes/fichainstitucional');
const RUTA_GENERO = require('./routes/genero');
const RUTA_LIMITE = require('./routes/limiteurbanocensal');
const RUTA_NIVEL = require('./routes/nivelinstruccion');
const RUTA_OCUPACION = require('./routes/ocupacion');
const RUTA_OCUPACIONDET = require('./routes/ocupaciondetallada');
const RUTA_PAIS = require('./routes/pais');
const RUTA_PERSONA = require('./routes/persona');
const RUTA_PROVINCIA = require('./routes/provincia');
const RUTA_PUEBLO = require('./routes/pueblooriginario');
const RUTA_REGION = require('./routes/region');
const RUTA_RELIGION = require('./routes/religionculto');
const RUTA_SEXO = require('./routes/sexo');
const RUTA_VIA = require('./routes/via');
const RUTA_SERVER = require('./routes/server');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//config cabeceras
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Request-Method,token,authorization,x-access-token,Authorization, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
  res.header('Allow', 'GET,POST,OPTIONS,PUT,DELETE');
  next();
});

//rutas que no requieren token
app.use(RUTA_SERVER);


app.use((req, res, next) => {

  // obtener token desde url, body o header
  if (req.body.token != undefined) {
    var token = req.body.token;
  } else if (req.query.token != undefined) {
    var token = req.query.token;
  } else if (req.headers['x-access-token'] != undefined) {
    var token = req.headers['x-access-token'];
  }  

  // decode token
  if (token) {
    // verifica palabra secreta y tiempo de expiracion
    jwt.verify(token, 'ilovecesar', function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Falló el token, no se reconoce.' });
      } else {
        // si todo queda bien , almacenar el request para proximas validaciones        
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // si no encuentra token devuelve el error y un mensaje
    return res.status(403).send({
      success: false,
      message: 'No se ha entregado ningun token.'
    });

  }
});



//rutas base que requieren token
app.use(RUTA_AGENDATELEFONICA);
app.use(RUTA_CADIRECCION);
app.use(RUTA_CATOCUPACIONAL);
app.use(RUTA_CLAFONASA);
app.use(RUTA_CODIRECCION);
app.use(RUTA_COMUNA);
app.use(RUTA_ESTABLECIMIENTORED);
app.use(RUTA_ESTADOCIVIL);
app.use(RUTA_FICHA);
app.use(RUTA_GENERO);
app.use(RUTA_LIMITE);
app.use(RUTA_NIVEL);
app.use(RUTA_OCUPACION);
app.use(RUTA_OCUPACIONDET);
app.use(RUTA_PAIS);
app.use(RUTA_PERSONA);
app.use(RUTA_PROVINCIA);
app.use(RUTA_PUEBLO);
app.use(RUTA_REGION);
app.use(RUTA_RELIGION);
app.use(RUTA_SEXO);
app.use(RUTA_VIA);









module.exports = app;
