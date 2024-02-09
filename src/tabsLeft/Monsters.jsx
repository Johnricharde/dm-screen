// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { calculateModifier, formatChallengeRating } from "./formatTools";
import Search from "./Search.jsx";



const Monsters = () => {
    const [selectedMonster, setSelectedMonster] = useState(null);

    async function fetchSelectedMonster(index) {
        try {
            const response = await axios.get(`https://www.dnd5eapi.co/api/monsters/${index}`);
            setSelectedMonster(response.data);
        } catch (error) {
            console.error("Error fetching Monster details:", error);
        }
    }

    return (
        <div>
            {/* Search bar with autocomplete */}
            <Search
                apiEndpoint="https://www.dnd5eapi.co/api/monsters"
                fetchSelectedEntity={fetchSelectedMonster} />

            {/* Display the selected Monster */}
            {selectedMonster && (
                <>
                    {/* Monster details */}
                    <h1 className="text-2xl font-bold">{selectedMonster.name}</h1>
                    <h2 className="italic">
                        {selectedMonster.size + ' '}
                        {selectedMonster.type}
                        {selectedMonster.subtype ? ' (' + selectedMonster.subtype + ')' : null},
                        {' ' + selectedMonster.alignment}
                    </h2>

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
                    <h2>
                        <span className="font-bold">Challenge </span>
                        {formatChallengeRating(selectedMonster.challenge_rating)} ({selectedMonster.xp} XP)
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



function getObjects(array) {
    const object = array.map((action, index) => (
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

export default Monsters;