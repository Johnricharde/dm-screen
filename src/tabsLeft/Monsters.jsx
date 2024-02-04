// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

const Monsters = () => {
    const MonstersListUrl = "https://www.dnd5eapi.co/api/Monsters";
    const [searchTerm, setSearchTerm] = useState('');
    const [MonstersList, setMonstersList] = useState([]);
    const [selectedMonster, setSelectedMonster] = useState(null);

    useEffect(() => {
        // Fetch the monsters list
        fetch(MonstersListUrl)
            .then(response => response.json())
            .then(data => setMonstersList(data.results))
            .catch(error => console.error('Error fetching Monsters list:', error));
    }, []);

    useEffect(() => {
        // Fetch details for the selected monster when searchTerm changes
        const fetchSelectedMonster = async () => {
            if (searchTerm && MonstersList.length > 0) {
                const selectedMonsterIndex = MonstersList.find(Monster => Monster.name.toLowerCase().startsWith(searchTerm.toLowerCase()))?.index;
                if (selectedMonsterIndex) {
                    try {
                        const response = await fetch(`https://www.dnd5eapi.co/api/Monsters/${selectedMonsterIndex}`);
                        const data = await response.json();
                        setSelectedMonster(data);
                    } catch (error) {
                        console.error('Error fetching Monster details:', error);
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
                    <h2><span className="font-bold">Armor Class </span>{selectedMonster.armor_class.value}</h2>
                    <h2><span className="font-bold">Hit Points </span>{selectedMonster.hit_points} ({selectedMonster.hit_dice})</h2>
                    <h2><span className="font-bold">Speed </span>{selectedMonster.speed.walk}</h2>
                    <h2><span className="font-bold">Initiative </span>{selectedMonster.initiative}</h2>
                    <br />
                    <p>{selectedMonster.desc}</p>
                    <br />
                    <h2><span className="font-bold">At Higher Levels. </span>{selectedMonster.higher_level}</h2>
                    <hr />
                </>
            )}
        </div>
    );
};

export default Monsters;
//             <h2><span className="font-bold">Initiative</span> +2</h2>
//             <hr />
//             <br />
//             <h2 className="font-bold">STR | DEX | CON | INT | WIS | CHA</h2>
//             <h3>8 (-1) | 14 (+2) | 10 (+0) | 10 (+0) | 8 (-1) | 8 (-1)</h3>
//             <hr />
//             <br />
//             <h2><span className="font-bold">Skills</span> Stealth +6</h2>
//             <h2><span className="font-bold">Senses</span> Darkvision 60 ft., Passive Perception 9</h2>
//             <h2><span className="font-bold">Languages</span> Common, Goblin</h2>
//             <h2><span className="font-bold">Challenge</span> 1/4 (50 XP)</h2>
//             <h2><span className="font-bold">Proficiency Bonus</span> +2</h2>
//             <hr />
//             <br />
//             <p> <span className="font-bold italic">Nimble Escape. </span>The goblin can take the Disengage or Hide action as a bonus action on each of its turns.</p>
//             <br />
//             <h1 className="text-2xl font-bold">Actions</h1>
//             <p> <span className="font-bold italic">Scimitar. </span>Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage.</p>
//             <p> <span className="font-bold italic">Shortbow. </span>Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.</p>
//         </div>
//     )
// }