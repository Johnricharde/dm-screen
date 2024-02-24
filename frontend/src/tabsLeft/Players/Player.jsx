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

export async function createPlayerElements() {
    try {
        const playerArray = await fetchCharacters();

        return playerArray.map((player, index) => ({
            id: index,
            playerName: player.playerName,
            characterName: player.characterName,
            class: player.class,
            race: player.race,
            notes: player.notes,
        }));
    } catch (error) {
        console.error('Error in createPlayerElements(): ', error);
        throw error;
    }
}
