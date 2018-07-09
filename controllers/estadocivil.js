const db = require('../pg-con');

function getAllEstadoCivil(req, res) {        
    db.any('select * from public.estado_civil')
        .then(function (estadocivil) {            
            if(!estadocivil){
                res.status(404).send({message: 'Estados Civil no encontrados'});    
            }else{
                res.status(200).send(JSON.stringify(estadocivil));
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor' + error});
        });
};

function getEstadoCivil(req, res) {
    let id = req.params.id;
    
    db.any('select * from public.estado_civil where codigo = $1',id)
        .then(function (estadocivil) {            
            if(Object.keys(estadocivil).length != 0){
                res.status(200).send(JSON.stringify({estadocivil}));
            }else{                
                res.status(404).send({message: 'Est. Civil no encontrado'});    
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor ' + error});
        });
};



module.exports = {
    getAllEstadoCivil,
    getEstadoCivil
    
}