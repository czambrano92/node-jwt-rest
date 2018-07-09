const db = require('../pg-con');

function getAllReligionCulto(req, res) {        
    db.any('select * from public.religion_culto')
        .then(function (religion) {            
            if(!religion){
                res.status(404).send({message: 'Religiones/Cultos no encontrados'});    
            }else{
                res.status(200).send(JSON.stringify(religion));
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor' + error});
        });
};

function getReligionCulto(req, res) {
    let id = req.params.id;
    
    db.any('select * from public.religion_culto where codigo = $1',id)
        .then(function (religion) {            
            if(Object.keys(religion).length != 0){
                res.status(200).send(JSON.stringify({religion}));
            }else{                
                res.status(404).send({message: 'Region no encontrada'});    
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor ' + error});
        });
};



module.exports = {
    getAllReligionCulto,
    getReligionCulto
}