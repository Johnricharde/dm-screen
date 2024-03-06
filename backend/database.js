import mysql from 'mysql2';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3000;

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Badonkadonk69.',
    database: 'dm_screen_db'
}).promise()

// Route to add a new player
app.post('/api/playerCharacters', async (req, res) => {
    const { playerName, characterName, class: playerClass, race, notes } = req.body;
    try {
        const result = await pool.query("INSERT INTO playerCharacter (playerName, characterName, class, race, notes) VALUES (?, ?, ?, ?, ?)", [playerName, characterName, playerClass, race, notes]);
        res.status(201).json({ success: true, message: 'Player added successfully' });
    } catch (error) {
        console.error('Error adding player: ', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Route to get all players
app.get('/api/playerCharacters', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM playerCharacter");
        res.json({ message: result });
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get a player character by ID
app.get('/api/playerCharacters/:id', async (req, res) => {
    const playerId = req.params.id;
    try {
        const result = await pool.query("SELECT * FROM playerCharacter WHERE playerID = ?", [playerId]);
        if (result.length === 0) {
            // If no player is found with the given ID, return 404
            return res.status(404).json({ error: 'Player not found' });
        }
        res.json({ message: result[0] });
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to update a player character by ID
app.put('/api/playerCharacters/:id', async (req, res) => {
    const playerId = req.params.id;
    const { playerName, characterName, class: playerClass, race, notes } = req.body;
    try {
        const result = await pool.query("UPDATE playerCharacter SET playerName=?, characterName=?, class=?, race=?, notes=? WHERE playerID=?", [playerName, characterName, playerClass, race, notes, playerId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, error: 'Player not found' });
        }
        res.json({ success: true, message: 'Player updated successfully' });
    } catch (error) {
        console.error('Error updating player: ', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Route to delete a player character by ID
app.delete('/api/playerCharacters/:id', async (req, res) => {
    const playerId = req.params.id;
    try {
        const result = await pool.query("DELETE FROM playerCharacter WHERE playerID = ?", [playerId]);
        if (result.affectedRows === 0) {
            // If no rows were affected, it means the player with the given ID was not found
            return res.status(404).json({ success: false, error: 'Player not found' });
        }
        res.json({ success: true, message: 'Player deleted successfully' });
    } catch (error) {
        console.error('Error deleting player: ', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});