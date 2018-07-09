const db = require('../pg-con');

function getOcupaciones(req, res) {        
    db.any('select * from public.ocupacion')
        .then(function (ocupacion) {            
            if(!ocupacion){
                res.status(404).send({message: 'Ocupaciones no encontradas'});    
            }else{
                res.status(200).send(JSON.stringify(ocupacion));
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor' + error});
        });
};

function getOcupacion(req, res) {
    let id = req.params.id;
    
    db.any('select * from public.ocupacion where codigo = $1',id)
        .then(function (ocupacion) {            
            if(Object.keys(ocupacion).length != 0){
                res.status(200).send(JSON.stringify({ocupacion}));
            }else{                
                res.status(404).send({message: 'Ocupación no encontrada'});    
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor ' + error});
        });
};



module.exports = {
    getOcupacion,
    getOcupaciones
}