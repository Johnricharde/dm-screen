import mysql from 'mysql2';

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Badonkadonk69.',
    database: 'dm_screen_db'
}).promise()

async function getCharacter() {
    const [result] = await pool.query("SELECT * FROM nonPlayerCharacter");
    return result;
}
const character = await getCharacter();
console.log(character);