const db = require('../pg-con');

function getProvincias(req, res) {        
    db.any('select * from public.provincia')
        .then(function (provincia) {            
            if(!provincia){
                res.status(404).send({message: 'Provincias no encontradas'});    
            }else{
                res.status(200).send(JSON.stringify(provincia));
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor' + error});
        });
};

function getProvincia(req, res) {
    let id = req.params.id;
    
    db.any('select * from public.provincia where codigo = $1',id)
        .then(function (provincia) {            
            if(Object.keys(provincia).length != 0){
                res.status(200).send(JSON.stringify({provincia}));
            }else{                
                res.status(404).send({message: 'Region no encontrada'});    
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor ' + error});
        });
};



module.exports = {        
    getProvincia,
    getProvincias    
}