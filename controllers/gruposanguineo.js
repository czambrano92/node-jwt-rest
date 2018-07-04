const db = require('../pg-con');

function getGruposSanguineos(req, res) {
    
    
    db.any('select * from public.gruposanguineo')
        .then(function (grupos) {            
            if(!grupos){
                res.status(404).send({message: 'comuna no encontrada'});    
            }else{
                res.status(200).send(JSON.stringify(grupos));
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor'});
        });
};

function getGrupoSanguineo(req, res) {
    let id = req.params.id;
    
    db.any('select * from public.gruposanguineo where idgruposangre = $1',id)
        .then(function (grupo) {            
            if(Object.keys(grupo).length != 0){
                res.status(200).send(JSON.stringify({grupo}));
            }else{                
                res.status(404).send({message: 'Comuna no encontrada'});    
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor'});
        });
};

module.exports = {
    getGruposSanguineos,
    getGrupoSanguineo
}