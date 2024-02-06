// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import calculateModifier from "./CalculateModifier";

const Monsters = () => {
    const MonstersListUrl = "https://www.dnd5eapi.co/api/Monsters";
    const [searchTerm, setSearchTerm] = useState("");
    const [MonstersList, setMonstersList] = useState([]);
    const [selectedMonster, setSelectedMonster] = useState(null);

    useEffect(() => {
        // Fetches the monsters list from the API using Axios
        axios.get(MonstersListUrl)
            .then(response => setMonstersList(response.data.results))
            .catch(error => console.error("Error fetching Monsters list:", error));
    }, []);

    useEffect(() => {
        // Fetch details for the selected monster when searchTerm changes
        const fetchSelectedMonster = async () => {
            if (searchTerm && MonstersList.length > 0) {
                const selectedMonsterIndex = MonstersList.find(monster => monster.name.toLowerCase().startsWith(searchTerm.toLowerCase()))?.index;
                if (selectedMonsterIndex) {
                    try {
                        const response = await axios.get(`https://www.dnd5eapi.co/api/monsters/${selectedMonsterIndex}`);
                        setSelectedMonster(response.data);
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

    function getObjects(array) {
        const objectsArray = array;
        const object = objectsArray.map((action, index) => (
            <>
                <p key={index}>
                    <span className="font-bold italic">{action.name}. </span>
                    {action.desc}
                </p>
                <br />
            </>
        ));
        return object;
    }

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
                    <h2><span className="font-bold">Initiative </span>{calculateModifier(selectedMonster.dexterity)}</h2>
                    <hr />
                    <h2 className="font-bold flex justify-around"></h2>
                    <h3 className="flex pb-2">
                        <div className="px-3">
                            <div className="font-bold flex justify-center">STR</div>
                            {selectedMonster.strength} ({calculateModifier(selectedMonster.strength)})
                        </div>
                        <div className="px-3">
                            <div className="font-bold flex justify-center">DEX</div>
                            {selectedMonster.dexterity} ({calculateModifier(selectedMonster.dexterity)})
                        </div>
                        <div className="px-3">
                            <div className="font-bold flex justify-center">CON</div>
                            {selectedMonster.constitution} ({calculateModifier(selectedMonster.constitution)})
                        </div>
                        <div className="px-3">
                            <div className="font-bold flex justify-center">INT</div>
                            {selectedMonster.intelligence} ({calculateModifier(selectedMonster.intelligence)})
                        </div>
                        <div className="px-3">
                            <div className="font-bold flex justify-center">WIS</div>
                            {selectedMonster.wisdom} ({calculateModifier(selectedMonster.wisdom)})
                        </div>
                        <div className="px-3">
                            <div className="font-bold flex justify-center">CHA</div>
                            {selectedMonster.charisma} ({calculateModifier(selectedMonster.charisma)})
                        </div>
                    </h3>
                    <hr />
                    <h2><span className="font-bold">Senses </span>
                        Darkvision {selectedMonster.senses.darkvision},
                        Passive Perception {selectedMonster.senses.passive_perception}
                    </h2>

                    <h2><span className="font-bold">Languages </span>
                        {selectedMonster.languages}
                    </h2>
                    <h2><span className="font-bold">Challenge </span>
                        {selectedMonster.challenge_rating} ({selectedMonster.xp} XP)
                    </h2>
                    <h2><span className="font-bold">Proficiency Bonus </span>
                        +{selectedMonster.proficiency_bonus}
                    </h2>
                    <br />

                    <hr />
                    {getObjects(selectedMonster.special_abilities)}
                    <h1 className="text-2xl font-bold">Actions</h1>
                    <hr />
                    {getObjects(selectedMonster.actions)}
                    <hr />
                </>
            )}
        </div>
    );
};

export default Monsters;