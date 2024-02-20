import mysql from 'mysql2';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
const port = 3000;

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Badonkadonk69.',
    database: 'dm_screen_db'
}).promise()

app.get('/api/playerCharacters', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM playerCharacter");
        res.json({ message: result });
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

// async function getCharacters() {
//     const [result] = await pool.query("SELECT * FROM nonPlayerCharacter");
//     return result;
// }
//const characters = await getCharacters();
//console.log(characters);