const { Pool } = require('pg');

// Konfigurasi database PostgreSQL
const pool = new Pool({
    user: 'dbuser',         // Ganti dengan user database
    host: 'localhost',      // Atau IP hosting database kamu
    database: 'wifispeeds', // Nama database
    password: 'password',   // Password user
    port: 5432,             // Port default PostgreSQL
});

module.exports = pool;
