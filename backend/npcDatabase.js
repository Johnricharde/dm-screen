import mysql from 'mysql2';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.SERVICE_PORT2;

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}).promise();


// FOR THE "Npcs.jsx"
// Route to add a new npc
app.post('/api/nonPlayerCharacters', async (req, res) => {
    const { npcName, npcOccupation, notes } = req.body;
    try {
        const result = await pool.query("INSERT INTO nonPlayerCharacter (npcName, npcOccupation, notes) VALUES (?, ?, ?)", [npcName, npcOccupation, notes]);
        res.status(201).json({ success: true, message: 'Npc added successfully' });
    } catch (error) {
        console.error('Error adding npc: ', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Route to get all npcs
app.get('/api/nonPlayerCharacters', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM nonPlayerCharacter");
        res.json({ message: result });
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get a npc by ID
app.get('/api/nonPlayerCharacters/:id', async (req, res) => {
    const npcId = req.params.id;
    try {
        const result = await pool.query("SELECT * FROM nonPlayerCharacter WHERE npcID = ?", [npcId]);
        if (result.length === 0) {
            // If no npc is found with the given ID, return 404
            return res.status(404).json({ error: 'Npc not found' });
        }
        res.json({ message: result[0] });
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to update an npc by ID
app.put('/api/nonPlayerCharacters/:id', async (req, res) => {
    const npcId = req.params.id;
    const { npcName, npcOccupation, notes } = req.body;
    try {
        const result = await pool.query("UPDATE nonPlayerCharacter SET npcName=?, npcOccupation=?, notes=? WHERE npcID=?", [npcName, npcOccupation, notes, npcId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, error: 'Npc not found' });
        }
        res.json({ success: true, message: 'Npc updated successfully' });
    } catch (error) {
        console.error('Error updating npc: ', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Route to delete an npc by ID
app.delete('/api/nonPlayerCharacters/:id', async (req, res) => {
    const npcId = req.params.id;
    try {
        const result = await pool.query("DELETE FROM nonPlayerCharacter WHERE npcID = ?", [npcId]);
        if (result.affectedRows === 0) {
            // If no rows were affected, it means the npc with the given ID was not found
            return res.status(404).json({ success: false, error: 'Npc not found' });
        }
        res.json({ success: true, message: 'Npc deleted successfully' });
    } catch (error) {
        console.error('Error deleting npc: ', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});