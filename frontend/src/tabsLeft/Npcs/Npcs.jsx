// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { createNpcElements } from './Npc';

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

async function addNpc(npcData) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(npcData),
    };
    return handleAPIRequest('http://localhost:3100/api/nonPlayerCharacters', options);
}

async function editNpc(npcId, npcData) {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(npcData),
    };
    return handleAPIRequest(`http://localhost:3100/api/nonPlayerCharacters/${npcId}`, options);
}

async function deleteNpc(npcId) {
    const options = {
        method: 'DELETE',
    };
    return handleAPIRequest(`http://localhost:3100/api/nonPlayerCharacters/${npcId}`, options);
}

export default function Npcs() {
    const initialnpcData = {
        npcName: '',
        npcOccupation: '',
        notes: '',
    };

    const [npcData, setnpcData] = useState(initialnpcData);
    const [npcs, setNpcs] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        async function fetchAndSetNpcs() {
            try {
                const npcElements = await createNpcElements();
                setNpcs(npcElements);
            } catch (error) {
                console.error('Error in Npcs(): ', error);
            }
        }
        fetchAndSetNpcs();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setnpcData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Check input lengths
            if (
                npcData.npcName.length > 50 ||
                npcData.npcOccupation.length > 50 ||
                npcData.notes.length > 255
            ) {
                alert("Maximum characters allowed for each input is 50 and 255 for notes!");
                return;
            }

            if (npcData.editingnpcId) {
                await editNpc(npcData.editingnpcId, npcData);
            } else {
                await addNpc(npcData);
            }

            setnpcData(initialnpcData);
            const updatedNpcs = await createNpcElements();
            setNpcs(updatedNpcs);
            setShowForm(false);
        } catch (error) {
            console.error('Failed to add/edit npc: ', error);
        }
    };

    const handleEdit = (npc) => {
        setShowForm(true);
        setnpcData({
            npcName: npc.npcName,
            npcOccupation: npc.npcOccupation,
            notes: npc.notes,
            editingnpcId: npc.npcID
        });
    };

    const handleDelete = async (npcId) => {
        try {
            await deleteNpc(npcId);
            const updatedNpcs = await createNpcElements();
            setNpcs(updatedNpcs);
        } catch (error) {
            console.error('Failed to delete npc: ', error);
        }
    };

    const handleNewNpcClick = () => {
        setShowForm(!showForm);
    };

    return (
        <div>
            <div className='flex'>
                <button
                    onClick={handleNewNpcClick}
                    className='flex-grow py-1 m-1 mt-2 bg-red-800 text-white'>
                    &#129095; CREATE NEW NPC &#129095;
                </button>
            </div>
            {showForm && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="mr-1 flex flex-col">
                            <div className="flex">
                                <h2 className="m-2 mr-0 font-bold w-24">Player: </h2>
                                <input
                                    className="text-white placeholder-gray-300 bg-black bg-opacity-50 p-1 m-1 flex-grow rounded-sm w-24"
                                    type="text"
                                    placeholder="Character's name..."
                                    name="npcName"
                                    value={npcData.npcName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex">
                                <h2 className="m-2 mr-0 font-bold w-24">Occupation: </h2>
                                <input
                                    className="text-white placeholder-gray-300 bg-black bg-opacity-50 p-1 m-1 flex-grow rounded-sm w-24"
                                    type="text"
                                    placeholder="Occupation..."
                                    name="npcOccupation"
                                    value={npcData.npcOccupation}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex">
                                <h2 className="m-2 mr-0 font-bold w-24">Notes: </h2>
                                <textarea
                                    className="text-white placeholder-gray-300 bg-black bg-opacity-50 p-1 m-1 flex-grow rounded-sm"
                                    type="textarea"
                                    placeholder="Notes..."
                                    name="notes"
                                    value={npcData.notes}
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
                {npcs.map(npc => {
                    return (
                        <div key={npc.npcID} className='text-gray-100 bg-black bg-opacity-50 m-1 px-1 rounded-md'>
                            <h2><span className="font-bold">Name: </span>{npc.npcName}</h2>
                            <h2><span className="font-bold">Occupation: </span>{npc.npcOccupation}</h2>
                            <h2 className="font-bold">Notes:</h2>
                            <p className='text-wrap max-w-90'>{npc.notes}</p>
                            <hr></hr>
                            <button
                                className="mr-1 my-1 flex-grow py-1 bg-cyan-800 text-white"
                                onClick={() => handleEdit(npc)}>
                                EDIT
                            </button>
                            <button
                                className="my-1 flex-grow py-1 bg-red-800 text-white"
                                onClick={() => handleDelete(npc.npcID)}>
                                DELETE
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}