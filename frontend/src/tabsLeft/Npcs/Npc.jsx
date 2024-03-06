// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

async function fetchNpc() {
    try {
        const response = await fetch('http://localhost:3000/api/nonPlayerCharacters');
        const data = await response.json();
        return data.message[0];
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

export async function createNpcElements() {
    try {
        const npcArray = await fetchNpc();

        return npcArray.map(npc => ({
            npcID: npc.npcID,
            npcName: npc.npcName,
            npcOccupation: npc.npcOccupation,
            notes: npc.notes,
        }));
    } catch (error) {
        console.error('Error in createNpcElements(): ', error);
        throw error;
    }
}
