const db = require('../pg-con');

function getVias(req, res) {        
    db.any('select * from public.via')
        .then(function (via) {            
            if(!via){
                res.status(404).send({message: 'Vias no encontradas'});    
            }else{
                res.status(200).send(JSON.stringify(via));
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor' + error});
        });
};

function getVia(req, res) {
    let id = req.params.id;
    
    db.any('select * from public.via where codigo = $1',id)
        .then(function (via) {            
            if(Object.keys(via).length != 0){
                res.status(200).send(JSON.stringify({via}));
            }else{                
                res.status(404).send({message: 'Via no encontrada'});    
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor ' + error});
        });
};



module.exports = {
    getVia,
    getVias
}