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

// Route to get a specific character for a specific player
app.get('/api/playerCharacters/:playerId/characters/:characterName', async (req, res) => {
    const playerId = req.params.playerId;
    const characterName = req.params.characterName;
    try {
        const result = await pool.query("SELECT * FROM playerCharacter WHERE playerId = ? AND characterName = ?", [playerId, characterName]);
        if (result[0].length === 0) {
            res.status(404).json({ error: 'Character not found' });
        } else {
            res.json({ message: result[0] });
        }
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Route to delete a specific character for a specific player
app.delete('/api/playerCharacters/:playerId/characters/:characterName', async (req, res) => {
    const playerId = req.params.playerId;
    const characterName = req.params.characterName;
    try {
        const result = await pool.query("DELETE FROM playerCharacter WHERE playerId = ? AND characterName = ?", [playerId, characterName]);
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Character not found' });
        } else {
            res.json({ success: true, message: 'Character deleted successfully' });
        }
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// app.get('/api/.......................', async (req, res) => {
//     try {
//         const result = await pool.query("SELECT ... FROM ... WHERE ...");
//         res.json({ message: result });
//     } catch (error) {
//         console.error('Error: ', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});