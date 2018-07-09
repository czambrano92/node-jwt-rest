const db = require('../pg-con');

function getAllSexo(req, res) {        
    db.any('select * from public.sexo')
        .then(function (sexo) {            
            if(!sexo){
                res.status(404).send({message: 'Sexos no encontrados'});    
            }else{
                res.status(200).send(JSON.stringify(sexo));
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor' + error});
        });
};

function getSexo(req, res) {
    let id = req.params.id;
    
    db.any('select * from public.sexo where codigo = $1',id)
        .then(function (sexo) {            
            if(Object.keys(sexo).length != 0){
                res.status(200).send(JSON.stringify({sexo}));
            }else{                
                res.status(404).send({message: 'Region no encontrada'});    
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor ' + error});
        });
};



module.exports = {
    getSexo,
    getAllSexo
}