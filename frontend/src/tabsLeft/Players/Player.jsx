// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

async function fetchCharacters() {
    try {
        const response = await fetch('http://localhost:3000/api/playerCharacters');
        const data = await response.json();
        return data.message[0];
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

async function createPlayerElements() {
    try {
        const playerArray = await fetchCharacters();

        const playerElements = playerArray.map((player, index) => (
            <div key={index}>
                <hr />
                <h2><span className="font-bold">Player Name: </span>{player.playerName}</h2>
                <h2><span className="font-bold">Character Name: </span>{player.characterName}</h2>
                <h2><span className="font-bold">Class: </span>{player.class}</h2>
                <h2><span className="font-bold">Race: </span>{player.race}</h2>
                <h2 className="font-bold">Notes:</h2>
                <p>{player.notes}</p>
                <br />
            </div>
        ));

        return playerElements;
    } catch (error) {
        console.error('Error in createPlayerElements(): ', error);
        throw error;
    }
}



export default function Player() {
    const [playersHtml, setPlayersHtml] = useState('');

    useEffect(() => {
        async function fetchAndSetPlayersHtml() {
            try {
                const html = await createPlayerElements();
                setPlayersHtml(html);
            } catch (error) {
                console.error('Error in Player(): ', error);
            }
        }
        fetchAndSetPlayersHtml();
    }, []);

    return playersHtml;
}