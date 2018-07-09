const db = require('../pg-con');

function getAllEstablecimientoRed(req, res) {        
    db.any('select * from public.establecimiento_red')
        .then(function (establecimiento_red) {            
            if(!establecimiento_red){
                res.status(404).send({message: 'Regiones no encontradas'});    
            }else{
                res.status(200).send(JSON.stringify(establecimiento_red));
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor' + error});
        });
};

function getEstablecimientoRed(req, res) {
    let id = req.params.id;
    
    db.any('select * from public.establecimiento_red where codigo = $1',id)
        .then(function (establecimiento_red) {            
            if(Object.keys(establecimiento_red).length != 0){
                res.status(200).send(JSON.stringify({establecimiento_red}));
            }else{                
                res.status(404).send({message: 'Region no encontrada'});    
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor ' + error});
        });
};



module.exports = {
    getAllEstablecimientoRed,
    getEstablecimientoRed
    
}