// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { createPlayerElements } from './Player';

async function handleAPIRequest(url, options) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Failed request: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API Request Error: ', error);
        throw error;
    }
}

async function addPlayer(playerData) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerData),
    };
    return handleAPIRequest('http://localhost:3000/api/playerCharacters', options);
}

async function deletePlayer(playerId) {
    const options = {
        method: 'DELETE',
    };
    return handleAPIRequest(`http://localhost:3000/api/playerCharacters/${playerId}`, options);
}

export default function Players() {
    const initialPlayerData = {
        playerName: '',
        characterName: '',
        class: '',
        race: '',
        notes: '',
    };

    const [playerData, setPlayerData] = useState(initialPlayerData);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        async function fetchAndSetPlayers() {
            try {
                const playerElements = await createPlayerElements();
                setPlayers(playerElements);
            } catch (error) {
                console.error('Error in Players(): ', error);
            }
        }
        fetchAndSetPlayers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlayerData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addPlayer(playerData);
            setPlayerData(initialPlayerData);
            const updatedPlayers = await createPlayerElements();
            setPlayers(updatedPlayers);
        } catch (error) {
            console.error('Failed to add player: ', error);
        }
    };

    const handleDelete = async (playerId) => {
        try {
            await deletePlayer(playerId);
            const updatedPlayers = await createPlayerElements();
            setPlayers(updatedPlayers);
        } catch (error) {
            console.error('Failed to delete player: ', error);
        }
    };


    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="mr-1 flex flex-col">
                        <div className="flex">
                            <h2 className="m-2 font-bold w-24">Player: </h2>
                            <input
                                className="p-1 m-1 flex-grow rounded-sm"
                                type="text"
                                placeholder="Player's name..."
                                name="playerName"
                                value={playerData.playerName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex">
                            <h2 className="m-2 font-bold w-24">Character: </h2>
                            <input
                                className="p-1 m-1 flex-grow rounded-sm"
                                type="text"
                                placeholder="Character's name..."
                                name="characterName"
                                value={playerData.characterName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex">
                            <h2 className="m-2 font-bold w-24">Class: </h2>
                            <input
                                className="p-1 m-1 flex-grow rounded-sm"
                                type="text"
                                placeholder="Character's class..."
                                name="class"
                                value={playerData.class}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex">
                            <h2 className="m-2 font-bold w-24">Race: </h2>
                            <input
                                className="p-1 m-1 flex-grow rounded-sm"
                                type="text"
                                placeholder="Character's race..."
                                name="race"
                                value={playerData.race}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex">
                            <h2 className="m-2 font-bold w-24">Notes: </h2>
                            <textarea
                                className="p-1 m-1 flex-grow rounded-sm"
                                type="textarea"
                                placeholder="Notes..."
                                name="notes"
                                value={playerData.notes}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="flex-grow py-1 m-1 bg-gray-700 text-white">
                            Add Player
                        </button>
                    </div>
                </form>
            </div>
            <hr />
            {players.map(player => {
                return (
                    <div key={player.playerID} className='m-1 px-1 bg-slate-300 rounded-md'>
                        <h2><span className="font-bold">Player Name: </span>{player.playerName}</h2>
                        <h2><span className="font-bold">Character Name: </span>{player.characterName}</h2>
                        <h2><span className="font-bold">Class: </span>{player.class}</h2>
                        <h2><span className="font-bold">Race: </span>{player.race}</h2>
                        <h2 className="font-bold">Notes:</h2>
                        <p className='text-wrap max-w-90'>{player.notes}</p>
                        <hr></hr>
                        <button
                            className="my-1 flex-grow py-1 bg-gray-700 text-white"
                            onClick={() => handleDelete(player.playerID)}>
                            Delete
                        </button>
                    </div>
                );
            })}
        </div>
    );
}