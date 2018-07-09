const db = require('../pg-con');

function getPersona(req, res) {
    let uid = req.params.uid;

    db.any('select * from public.persona where id_persona = $1', uid)
        .then(function (persona) {
            if (Object.keys(persona).length != 0) {
                res.status(200).send(JSON.stringify({ persona }));
            } else {
                res.status(404).send({ message: 'Persona no encontrada' });
            }
        })
        .catch(function (error) {
            res.status(500).send({ message: 'Error en el servidor' });
        });
};

function savePersona(req, res) {
    let params = req.body;

    db.one('INSERT INTO "public"."persona" (' +
        '"religion_culto_cod", "genero_cod", "estado_civil_cod", "sexo_cod",' +
        '"pais_cod", "pueblo_indigena_cod", "prevision_cod", "clasificacion_fonasa_cod",' +
        '"cat_ocupacion_cod", "nivel_instruccion_cod", "ocupacion_cod", "ocupacion_det_cod",' +
        '"nombres", "primer_apellido", "segundo_apellido", "nombre_social",' +
        '"run","digito_verificador","rut_provisorio_fonasa", "rut_institucional", '+
        '"pasaporte", "numero_ficha_hblt", "fecha_nacimiento", "fallecido", '+
        '"fecha_hora_defuncion","actualizacion_fonasa")' +
        'VALUES ($1,$2,$3,$4,' +
        '$5,$6,$7,$8,' +
        '$9,$10,$11,$12,' +
        '$13,$14,$15,$16,' +
        '$17,$18,$19,$20,' +
        '$21,$22,$23,$24,' +
        '$25,$26) RETURNING id_persona;'
        , [params.religion_culto_cod, params.genero_cod, params.estado_civil_cod, params.sexo_cod,
        params.pais_cod, params.pueblo_indigena_cod, params.prevision_cod, params.clasificacion_fonasa_cod,
        params.cat_ocupacion_cod, params.nivel_instruccion_cod, params.ocupacion_cod, params.ocupacion_det_cod,
        params.nombres, params.primer_apellido, params.segundo_apellido, params.nombre_social,
        params.run, params.digito_verificador ,params.rut_provisorio_fonasa, params.rut_institucional, 
        params.pasaporte, params.numero_ficha_hblt, params.fecha_nacimiento, params.fallecido, 
        params.fecha_hora_defuncion, params.actualizacion_fonasa])
        .then(id_persona => {
            res.status(200).send(JSON.stringify({ id_persona }));
            console.log("PERSONA INSERT OK");
        })
        .catch(error => {
            res.status(500).send({ message: 'Error en el servidor' });
            console.log("ERROR INSERT PERSONA: " + error);
        });
};

module.exports = {
    getPersona,
    savePersona
}