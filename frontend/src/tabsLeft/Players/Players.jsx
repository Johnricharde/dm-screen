// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { createPlayerElements } from './Player';

async function addPlayer(playerData) {
    try {
        const response = await fetch('http://localhost:3000/api/playerCharacters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playerData),
        });

        if (!response.ok) {
            throw new Error('Failed to add player');
        }

        return true;
    } catch (error) {
        console.error('Error adding player: ', error);
        throw error;
    }
}

async function deletePlayer(playerId) {
    try {
        const response = await fetch(`http://localhost:3000/api/playerCharacters/${playerId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete player');
        }

        return true;
    } catch (error) {
        console.error('Error deleting player: ', error);
        throw error;
    }
}

export default function Players() {
    const [playerData, setPlayerData] = useState({
        playerName: '',
        characterName: '',
        class: '',
        race: '',
        notes: '',
    });

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
            setPlayerData({
                playerName: '',
                characterName: '',
                class: '',
                race: '',
                notes: '',
            });
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
            <br />
            {players.map(player => {
                console.log("||||||||||||||||||||||||||||||||||||||||||||||||||||||")
                console.log('Player ID:', player.playerID);

                return (
                    <div key={player.playerID}>
                        <hr />
                        <h2><span className="font-bold">Player Name: </span>{player.playerName}</h2>
                        <h2><span className="font-bold">Character Name: </span>{player.characterName}</h2>
                        <h2><span className="font-bold">Class: </span>{player.class}</h2>
                        <h2><span className="font-bold">Race: </span>{player.race}</h2>
                        <h2 className="font-bold">Notes:</h2>
                        <p>{player.notes}</p>
                        <button
                            className="flex-grow py-1 bg-gray-700 text-white"
                            onClick={() => handleDelete(player.playerID)}>
                            Delete
                        </button>
                        <br />
                    </div>
                );
            })}
        </div>
    );
}