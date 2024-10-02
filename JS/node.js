const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // Atau gunakan MySQL

app.use(bodyParser.json());

const pool = new Pool({
    user: 'dbuser',
    host: 'localhost',
    database: 'wifispeeds',
    password: 'password',
    port: 5432,
});

app.post('/save-speed', async (req, res) => {
    const { speed } = req.body;
    const timestamp = new Date();

    try {
        await pool.query('INSERT INTO speeds (speed, timestamp) VALUES ($1, $2)', [speed, timestamp]);
        res.status(200).send('Data disimpan');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error menyimpan data');
    }
});

app.listen(3000, () => {
    console.log('Server berjalan di port 3000');
});
