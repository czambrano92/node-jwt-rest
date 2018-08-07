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

    db.one('INSERT INTO public.persona ' +
        '(' +
        'religion_culto_cod,     genero_cod,             estado_civil_cod,   sexo_cod, ' +
        'pais_cod,              pueblo_indi_cod,        prevision_cod,          clas_fonasa_cod,    isapre_cod, ' +
        'prais,                 cat_ocupa_cod,          nivel_instruc_cod,      ocupa_cod,          ocupa_det_cod, ' +
        'nombres,               primer_apellido,        segundo_apellido,       nombre_social,      run, ' +
        'digito_verificador,    rut_provisorio_fonasa,  rut_institucional,      pasaporte,          numero_ficha_hblt, ' +
        'fecha_nacimiento,      fallecido,              fecha_hora_defuncion,   fecha_hora_creacion_registro' +
        ') VALUES ' +
        '(' +
        '$1,    $2,     $3,     $4,     ' +
        '$5,    $6,     $7,     $8,     $9, ' +
        '$10,   $11,   $12,    $13,    $14, ' +
        '$15,   $16,   $17,    $18,    $19, ' +
        '$20,   $21,   $22,    $23,    $24, ' +
        '$25,   $26,   $27,    $28     ' +
        ') RETURNING id_persona;'
        , [
            params.religion_culto_cod,      params.genero_cod,              params.estado_civil_cod,    params.sexo_cod,
            params.pais_cod,            params.pueblo_indi_cod,         params.prevision_cod,           params.clas_fonasa_cod,     params.isapre_cod,
            params.prais,               params.cat_ocupa_cod,           params.nivel_instruc_cod,       params.ocupa_cod,           params.ocupa_det_cod,
            params.nombres,             params.primer_apellido,         params.segundo_apellido,        params.nombre_social,       params.run,
            params.digito_verificador,  params.rut_provisorio_fonasa,   params.rut_institucional,       params.pasaporte,           params.numero_ficha_hblt,
            params.fecha_nacimiento,    params.fallecido,               params.fecha_hora_defuncion,    params.fecha_hora_creacion_registro
        ])
        .then(id_persona => {
            res.status(200).send(JSON.stringify({ id_persona }));
            console.log("PERSONA INSERT OK");
        })
        .catch(error => {
            res.status(500).send({ message: 'Error en el servidor' });
            console.log("ERROR INSERT PERSONA: " + error);
        });
};

/**
 * se envia un parametro identificador
 * 1 rut | 2 pasaporte| 3 rut fonsa
 * @param {*} req 
 * @param {*} res 
 */
function getPersonaByIdentificador(req, res) {
    console.log('get persona by id')
    let uid = req.params.uid;
    let tipoDoc = parseInt(req.params.identificador, 10)
    let sql = ""
    switch (tipoDoc) {
        case 1:
            console.log('rut')
            let datos = uid.split('-')
            sql = "select * from public.persona where run =" + datos[0] + " and digito_verificador = '" + datos[1] + "'"
            console.log(sql)
            break
        case 2:
            sql = "select * from public.persona where pasaporte = '" + uid + "' "
            break
        case 3:
            sql = "select * from public.persona where rut_provisorio_fonasa = '" + uid + "' "
            break
    }
    db.one(sql)
        .then(function (persona) {
            if (Object.keys(persona).length != 0) {
                console.log(persona)
                res.status(200).send(JSON.stringify({ persona }));
            } else {
                res.status(404).send({ message: 'Persona no encontrada' });
            }
        })
        .catch(function (error) {
            res.status(500).send({ message: 'Error en el servidor' });
        });
};


function updatePersona(req, res) {
    console.log('>>ENTRA A PUT');
    let params = req.body;

    console.log(JSON.stringify(params));
    console.log('ID PERSONA >> ' + params.id_persona);


    db.one('UPDATE public.persona AS p ' +
        'SET religion_culto_cod=COALESCE(CAST($1 AS TEXT),p.religion_culto_cod ), ' +
        'genero_cod=COALESCE(CAST($2 AS TEXT),p.genero_cod ), ' +
        'estado_civil_cod=COALESCE(CAST($3 AS TEXT),p.estado_civil_cod ), ' +
        'sexo_cod=COALESCE(CAST($4 AS TEXT),p.sexo_cod ), ' +
        'pais_cod=COALESCE(CAST($5 AS TEXT),p.pais_cod ), ' +
        'pueblo_indi_cod=COALESCE(CAST($6 AS TEXT),p.pueblo_indi_cod ), ' +
        'prevision_cod=COALESCE(CAST($7 AS TEXT),p.prevision_cod ), ' +
        'clas_fonasa_cod=COALESCE(CAST($8 AS TEXT),p.clas_fonasa_cod ), ' +
        'isapre_cod=COALESCE(CAST($9 AS TEXT),p.isapre_cod ), ' +
        'prais=COALESCE($10,p.prais ), ' +
        'cat_ocupa_cod=COALESCE(CAST($11 AS TEXT),p.cat_ocupa_cod ), ' +
        'nivel_instruc_cod=COALESCE(CAST($12 AS TEXT),p.nivel_instruc_cod ), ' +
        'ocupa_cod=COALESCE(CAST($13 AS TEXT),p.ocupa_cod ), ' +
        'ocupa_det_cod=COALESCE(CAST($14 AS TEXT),p.ocupa_det_cod ), ' +
        'nombres=COALESCE(CAST($15 AS TEXT),p.nombres ), ' +
        'primer_apellido=COALESCE(CAST($16 AS TEXT),p.primer_apellido ), ' +
        'segundo_apellido=COALESCE(CAST($17 AS TEXT),p.segundo_apellido ), ' +
        'nombre_social=COALESCE(CAST($18 AS TEXT),p.nombre_social ), ' +
        'run=COALESCE(CAST($19 AS INTEGER),p.run ), ' +
        'digito_verificador=COALESCE(CAST($20 AS TEXT),p.digito_verificador ), ' +
        'rut_provisorio_fonasa=COALESCE(CAST($21 AS TEXT),p.rut_provisorio_fonasa ),' +
        'rut_institucional=COALESCE(CAST($22 AS TEXT),p.rut_institucional ), ' +
        'pasaporte=COALESCE(CAST($23 AS TEXT),p.pasaporte ), ' +
        'numero_ficha_hblt=COALESCE(CAST($24 AS TEXT),p.numero_ficha_hblt ), ' +
        'fecha_nacimiento=COALESCE(CAST($25 AS TIMESTAMP),p.fecha_nacimiento ), ' +
        'fallecido=COALESCE($26,p.fallecido ), ' +
        'fecha_hora_defuncion=COALESCE(CAST($27 AS TIMESTAMP),p.fecha_hora_defuncion ), ' +
        'fecha_hora_creacion_registro=COALESCE(CAST($28 AS TIMESTAMP),p.fecha_hora_creacion_registro ) ' +
        'WHERE p.id_persona = CAST($29 AS TEXT)' +
        ' RETURNING id_persona '
        , [
            params.religion_culto_cod,
            params.genero_cod,
            params.estado_civil_cod,
            params.sexo_cod,
            params.pais_cod,
            params.pueblo_indi_cod,
            params.prevision_cod,
            params.clas_fonasa_cod,
            params.isapre_cod,
            params.prais,
            params.cat_ocupa_cod,
            params.nivel_instruc_cod,
            params.ocupa_cod,
            params.ocupa_det_cod,
            params.nombres,
            params.primer_apellido,
            params.segundo_apellido,
            params.nombre_social,
            params.run,
            params.digito_verificador,
            params.rut_provisorio_fonasa,
            params.rut_institucional,
            params.pasaporte,
            params.numero_ficha_hblt,
            params.fecha_nacimiento,
            params.fallecido,
            params.fecha_hora_defuncion,
            params.fecha_hora_creacion_registro,
            params.id_persona
        ])
        .then(id_persona => {
            res.status(200).send(JSON.stringify({ success: true, id_persona }));
            console.log("PERSONA EDITADA: OK");
        })
        .catch(error => {

            if (error['received'] == 0) {
                res.status(404).send({ success: false, message: 'Persona no encontrada' });
                console.log("ERROR UPDATE PERSONA 404");
            } else {
                res.status(500).send({ success: false, message: 'Error en el servidor' });
                console.log("ERROR UPDATE PERSONA 500");
            }

        });

};

module.exports = {
    getPersona,
    savePersona,
    getPersonaByIdentificador,
    updatePersona
}