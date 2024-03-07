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

async function editPlayer(playerId, playerData) {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerData),
    };
    return handleAPIRequest(`http://localhost:3000/api/playerCharacters/${playerId}`, options);
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
    const [showForm, setShowForm] = useState(false);

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
            // Check input lengths
            if (
                playerData.playerName.length > 50 ||
                playerData.characterName.length > 50 ||
                playerData.class.length > 50 ||
                playerData.race.length > 50 ||
                playerData.notes.length > 255
            ) {
                alert("Maximum characters allowed for each input is 50 and 255 for notes!");
                return;
            }

            if (playerData.editingPlayerId) {
                await editPlayer(playerData.editingPlayerId, playerData);
            } else {
                await addPlayer(playerData);
            }

            setPlayerData(initialPlayerData);
            const updatedPlayers = await createPlayerElements();
            setPlayers(updatedPlayers);
            setShowForm(false);
        } catch (error) {
            console.error('Failed to add/edit player: ', error);
        }
    };

    const handleEdit = (player) => {
        setShowForm(true);
        setPlayerData({
            playerName: player.playerName,
            characterName: player.characterName,
            class: player.class,
            race: player.race,
            notes: player.notes,
            editingPlayerId: player.playerID
        });
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

    const handleNewPlayerClick = () => {
        setShowForm(!showForm);
    };

    return (
        <div>
            <div className='flex'>
                <button
                    onClick={handleNewPlayerClick}
                    className='flex-grow py-1 m-1 mt-2 bg-red-800 text-white'>
                    &#129095; CREATE NEW PLAYER &#129095;
                </button>
            </div>
            {showForm && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="mr-1 flex flex-col">
                            <div className="flex">
                                <h2 className="m-2 mr-0 font-bold w-20">Player: </h2>
                                <input
                                    className="text-white placeholder-gray-300 bg-black bg-opacity-50 p-1 m-1 flex-grow rounded-sm w-24"
                                    type="text"
                                    placeholder="Player's name..."
                                    name="playerName"
                                    value={playerData.playerName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex">
                                <h2 className="m-2 mr-0 font-bold w-20">Character: </h2>
                                <input
                                    className="text-white placeholder-gray-300 bg-black bg-opacity-50 p-1 m-1 flex-grow rounded-sm w-24"
                                    type="text"
                                    placeholder="Name..."
                                    name="characterName"
                                    value={playerData.characterName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex">
                                <h2 className="m-2 mr-0 font-bold w-20">Class: </h2>
                                <input
                                    className="text-white placeholder-gray-300 bg-black bg-opacity-50 p-1 m-1 flex-grow rounded-sm w-24"
                                    type="text"
                                    placeholder="Class..."
                                    name="class"
                                    value={playerData.class}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex">
                                <h2 className="m-2 mr-0 font-bold w-20">Race: </h2>
                                <input
                                    className="text-white placeholder-gray-300 bg-black bg-opacity-50 p-1 m-1 flex-grow rounded-sm w-24"
                                    type="text"
                                    placeholder="Race..."
                                    name="race"
                                    value={playerData.race}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex">
                                <h2 className="m-2 mr-0 font-bold w-20">Notes: </h2>
                                <textarea
                                    className="text-white placeholder-gray-300 bg-black bg-opacity-50 p-1 m-1 flex-grow rounded-sm"
                                    type="textarea"
                                    placeholder="Notes..."
                                    name="notes"
                                    value={playerData.notes}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit" className="flex-grow py-1 m-1 mr-0 bg-red-800 text-white">
                                COMPLETE
                            </button>
                        </div>
                    </form>
                </div>
            )}
            <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2'>
                {players.map(player => {
                    return (
                        <div key={player.playerID} className='text-gray-100 bg-black bg-opacity-50 m-1 px-1 rounded-md'>
                            <h2><span className="font-bold">Player: </span>{player.playerName}</h2>
                            <h2><span className="font-bold">Character: </span>{player.characterName}</h2>
                            <h2><span className="font-bold">Class: </span>{player.class}</h2>
                            <h2><span className="font-bold">Race: </span>{player.race}</h2>
                            <h2 className="font-bold">Notes:</h2>
                            <p className='text-wrap max-w-90'>{player.notes}</p>
                            <hr></hr>
                            <button
                                className="mr-1 my-1 flex-grow py-1 bg-cyan-800 text-white"
                                onClick={() => handleEdit(player)}>
                                EDIT
                            </button>
                            <button
                                className="my-1 flex-grow py-1 bg-red-800 text-white"
                                onClick={() => handleDelete(player.playerID)}>
                                DELETE
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}