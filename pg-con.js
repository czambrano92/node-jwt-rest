const pgp = require('pg-promise')();
const cn = {
    host: '10.6.109.185',
    port: 5432,
    database: 'mdb_paciente',
    user: 'desarrollo',
    password: 'dgtidev*'
};

const db = pgp(cn);
 
module.exports = db;
