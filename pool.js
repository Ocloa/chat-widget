const {Pool} = require('pg');

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "8022",
    database: "postgres"
});

module.exports = pool;