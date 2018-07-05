const db = require('../pg-con');

function getPersona(req, res) {
    let rut = req.params.rut;
    
    db.any('select * from public.persona where rut = $1',rut)
        .then(function (persona) {            
            if(Object.keys(persona).length != 0){                
                res.status(200).send(JSON.stringify({persona}));
            }else{
                res.status(404).send({message: 'Persona no encontrada'});    
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor'});
        });
};

function savePersona(req,res){    
    let params = req.body;
        
    db.one('INSERT INTO "public"."persona" ("rut", "nncod", "pasaporte", "identificado", '+
        '"fechadenacimiento", "apepaterno", "apematerno", "nombres", '+
          '"sexocod", "estconcod", "pueoricod", "religioncod", '+
          '"ocupacod", "comunacod", "nivelcod", "clasificacod", '+
          '"naccod", "ficha", "direccion", "fallecido", '+
          '"correo", "telefono", "rutapoderado", "ultactfonasa",' +
          '"fechafallecido", "fichavigente", "estadotupla", "nombresocial", '+
          '"prais", "descprais", "idgruposangre", "comunacod2", ' +
          '"direccion2", "telefono2", "codigo_est_consultorio", "desc_est_consultorio", "impo_percapita")' +
          ' VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'+
                '   $11,$12,$13,$14,$15,$16,$17,$18,$19,$20,'+
                '   $21,$22,$23,$24,$25,$26,$27,$28,$29,$30,' +
                '   $31,$32,$33,$34,$35,$36,$37) RETURNING * '
                , [params.rut,params.nncod,params.pasaporte,params.identificado,
                params.fechadenacimiento,params.apepaterno,params.apematerno,params.nombres,
                params.sexocod,params.estconcod,params.pueoricod,params.religioncod,
                params.ocupacod,params.comunacod,params.nivelcod,params.clasificacod,
                params.naccod,params.ficha,params.direccion,params.fallecido,
                params.correo,params.telefono,params.rutapoderado,params.ultactfonasa,
                params.fechafallecido,params.fichavigente,params.estadotupla,params.nombresocial,
                params.prais,params.descprais,params.idgruposangre,params.comunacod2,
                params.direccion2,params.telefono2,params.codigo_est_consultorio,params.desc_est_consultorio,params.impo_percapita])
    .then(persona => {        
        res.status(200).send(JSON.stringify({persona}));
        console.log("PERSONA INSERT OK");
    })
    .catch(error => {
        res.status(500).send({message: 'Error en el servidor'});
        console.log("ERROR INSERT PERSONA: " + error);
    });    
};

module.exports = {
    getPersona,
    savePersona
}