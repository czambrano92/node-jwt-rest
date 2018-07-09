const db = require('../pg-con');

function getPrevisiones(req, res) {        
    db.any('select * from public.prevision')
        .then(function (prevision) {            
            if(!prevision){
                res.status(404).send({message: 'Previsiones no encontradas'});    
            }else{
                res.status(200).send(JSON.stringify(prevision));
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor' + error});
        });
};

function getPrevision(req, res) {
    let id = req.params.id;
    
    db.any('select * from public.prevision where codigo = $1',id)
        .then(function (prevision) {            
            if(Object.keys(prevision).length != 0){
                res.status(200).send(JSON.stringify({prevision}));
            }else{                
                res.status(404).send({message: 'Prevision no encontrada'});    
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor ' + error});
        });
};



module.exports = {
    getPrevision,
    getPrevisiones
    
}