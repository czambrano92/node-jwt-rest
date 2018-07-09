const db = require('../pg-con');

function getRegiones(req, res) {        
    db.any('select * from public.region')
        .then(function (regiones) {            
            if(!regiones){
                res.status(404).send({message: 'Regiones no encontradas'});    
            }else{
                res.status(200).send(JSON.stringify(regiones));
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor' + error});
        });
};

function getRegion(req, res) {
    let id = req.params.id;
    
    db.any('select * from public.region where codigo = $1',id)
        .then(function (comuna) {            
            if(Object.keys(comuna).length != 0){
                res.status(200).send(JSON.stringify({comuna}));
            }else{                
                res.status(404).send({message: 'Region no encontrada'});    
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor ' + error});
        });
};



module.exports = {
    getRegiones,
    getRegion
    
}