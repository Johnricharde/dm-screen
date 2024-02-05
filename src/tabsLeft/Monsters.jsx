// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

const Monsters = () => {
    const MonstersListUrl = "https://www.dnd5eapi.co/api/Monsters";
    const [searchTerm, setSearchTerm] = useState("");
    const [MonstersList, setMonstersList] = useState([]);
    const [selectedMonster, setSelectedMonster] = useState(null);

    useEffect(() => {
        // Fetches the monsters list from the API
        fetch(MonstersListUrl)
            .then(response => response.json())
            .then(data => setMonstersList(data.results))
            .catch(error => console.error("Error fetching Monsters list:", error));
    }, []);

    useEffect(() => {
        // Fetch details for the selected monster when searchTerm changes
        const fetchSelectedMonster = async () => {
            if (searchTerm && MonstersList.length > 0) {
                const selectedMonsterIndex = MonstersList.find(monster => monster.name.toLowerCase().startsWith(searchTerm.toLowerCase()))?.index;
                if (selectedMonsterIndex) {
                    try {
                        const response = await fetch(`https://www.dnd5eapi.co/api/monsters/${selectedMonsterIndex}`);
                        const data = await response.json();
                        setSelectedMonster(data);
                    } catch (error) {
                        console.error("Error fetching Monster details:", error);
                    }
                }
            } else {
                setSelectedMonster(null);
            }
        };

        fetchSelectedMonster();
    }, [searchTerm, MonstersList]);

    return (
        <div>
            {/* Search bar */}
            <input
                type="text"
                placeholder="Search for a monster..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <hr />

            {/* Display the filtered Monster */}
            {selectedMonster && (
                <>
                    <h1 className="text-2xl font-bold">{selectedMonster.name}</h1>
                    <h2 className="italic">{selectedMonster.size} {selectedMonster.type} ({selectedMonster.subtype}) {selectedMonster.alignment}</h2>
                    <hr />
                    <h2><span className="font-bold">Armor Class </span>{selectedMonster.armor_class[0].value}</h2>
                    <h2><span className="font-bold">Hit Points </span>{selectedMonster.hit_points} ({selectedMonster.hit_dice})</h2>
                    <h2><span className="font-bold">Speed </span>{selectedMonster.speed.walk}</h2>
                    <hr />
                    <h2><span className="font-bold">Initiative </span>||PLACEHOLDER||</h2>
                    <h2 className="font-bold">STR | DEX | CON | INT | WIS | CHA</h2>
                    <h3>{selectedMonster.strength} (||) | {selectedMonster.dexterity} (||) | {selectedMonster.constitution} (||) | {selectedMonster.intelligence} (||) | {selectedMonster.wisdom} (||) | {selectedMonster.charisma} (||)</h3>
                    <hr />
                    <h2><span className="font-bold">Skills </span>||PLACEHOLDER PROFICIENCIES||</h2>
                    <h2><span className="font-bold">Languages </span>{selectedMonster.languages}</h2>
                    <h2><span className="font-bold">Challenge </span>{selectedMonster.challenge_rating} ({selectedMonster.xp} XP)</h2>
                    <hr />
                    <p><span className="font-bold italic"></span>||PLACEHOLDER SPECIAL ABILITIES||</p>
                    <hr />
                </>
            )}
        </div>
    );
};

export default Monsters;