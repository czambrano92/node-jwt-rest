const db = require('../pg-con');

function getAllClasificacionFonasa(req, res) {        
    db.any('select * from public.clasificacion_fonasa')
        .then(function (clasificacion) {            
            if(!clasificacion){
                res.status(404).send({message: 'Regiones no encontradas'});    
            }else{
                res.status(200).send(JSON.stringify(clasificacion));
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor' + error});
        });
};

function getClasificacionFonasa(req, res) {
    let id = req.params.id;
    
    db.any('select * from public.clasificacion_fonasa where codigo = $1',id)
        .then(function (clasificacion) {            
            if(Object.keys(clasificacion).length != 0){
                res.status(200).send(JSON.stringify({clasificacion}));
            }else{                
                res.status(404).send({message: 'Region no encontrada'});    
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor ' + error});
        });
};



module.exports = {
    getAllClasificacionFonasa,
    getClasificacionFonasa
}