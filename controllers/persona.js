const db = require('../pg-con');

function getPersona(req, res) {
    let rut = req.params.rut;
    
    db.any('select * from public.persona where rut = $1',rut)
        .then(function (persona) {            
            if(Object.keys(persona).length === 0){
                res.status(404).send({message: 'Persona no encontrada'});    
            }else{
                res.status(200).send(JSON.stringify({persona}));
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor'});
        });
};

module.exports = {
    getPersona
}