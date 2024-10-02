const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../config/db'); // Menghubungkan ke database

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public'))); // Serve static files (HTML)

// API untuk menyimpan kecepatan WiFi
app.post('/save-speed', async (req, res) => {
    const { speed } = req.body;
    const timestamp = new Date();

    try {
        await db.query('INSERT INTO speeds (speed, timestamp) VALUES ($1, $2)', [speed, timestamp]);
        res.status(200).send('Data berhasil disimpan');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error menyimpan data');
    }
});

// API untuk mendapatkan data kecepatan WiFi
app.get('/get-speeds', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM speeds ORDER BY timestamp');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error mengambil data');
    }
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
