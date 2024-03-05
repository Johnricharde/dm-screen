// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { calculateModifier, formatChallengeRating } from "../formatTools.jsx";
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
                    <div className="bg-slate-300 px-2 pb-1 mt-2 rounded-md">
                        <h1 className="text-2xl font-bold">{selectedMonster.name}</h1>
                        <h2 className="italic">
                            {selectedMonster.size + ' '}
                            {selectedMonster.type}
                            {selectedMonster.subtype ? ' (' + selectedMonster.subtype + ')' : null},
                            {' ' + selectedMonster.alignment}
                        </h2>
                    </div>

                    <h2><span className="font-bold">Armor Class </span>{selectedMonster.armor_class[0].value}</h2>
                    <h2><span className="font-bold">Hit Points </span>{selectedMonster.hit_points} ({selectedMonster.hit_dice})</h2>
                    <h2><span className="font-bold">Speed </span>{selectedMonster.speed.walk}</h2>
                    <h2><span className="font-bold">Initiative </span>{calculateModifier(selectedMonster.dexterity)}</h2>
                    <h2 className="font-bold flex justify-space">
                        <h3 className="p-2 grid gap-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
                            <div className="px-3 py-1 rounded-lg bg-slate-200">
                                <div className="text-slate-500 font-bold flex justify-center">STR</div>
                                <div className="flex justify-center text-nowrap ">
                                    {selectedMonster.strength} (<span className={calculateModifier(selectedMonster.strength) < 0 ? 'text-red-600' : 'text-emerald-600'}>
                                        {calculateModifier(selectedMonster.strength)}
                                    </span>)
                                </div>
                            </div>
                            <div className="px-3 py-1 rounded-lg bg-slate-200">
                                <div className="text-slate-500 font-bold flex justify-center">DEX</div>
                                <div className="flex justify-center text-nowrap">
                                    {selectedMonster.dexterity} (<span className={calculateModifier(selectedMonster.dexterity) < 0 ? 'text-red-600' : 'text-emerald-600'}>
                                        {calculateModifier(selectedMonster.dexterity)}
                                    </span>)
                                </div>
                            </div>
                            <div className="px-3 py-1 rounded-lg bg-slate-200">
                                <div className="text-slate-500 font-bold flex justify-center">CON</div>
                                <div className="flex justify-center text-nowrap">
                                    {selectedMonster.constitution} (<span className={calculateModifier(selectedMonster.constitution) < 0 ? 'text-red-600' : 'text-emerald-600'}>
                                        {calculateModifier(selectedMonster.constitution)}
                                    </span>)
                                </div>
                            </div>
                            <div className="px-3 py-1 rounded-lg bg-slate-200">
                                <div className="text-slate-500 font-bold flex justify-center">INT</div>
                                <div className="flex justify-center text-nowrap">
                                    {selectedMonster.intelligence} (<span className={calculateModifier(selectedMonster.intelligence) < 0 ? 'text-red-600' : 'text-emerald-600'}>
                                        {calculateModifier(selectedMonster.intelligence)}
                                    </span>)
                                </div>
                            </div>
                            <div className="px-3 py-1 rounded-lg bg-slate-200">
                                <div className="text-slate-500 font-bold flex justify-center">WIS</div>
                                <div className="flex justify-center text-nowrap">
                                    {selectedMonster.wisdom} (<span className={calculateModifier(selectedMonster.wisdom) < 0 ? 'text-red-600' : 'text-emerald-600'}>
                                        {calculateModifier(selectedMonster.wisdom)}
                                    </span>)
                                </div>
                            </div>
                            <div className="px-3 py-1 rounded-lg bg-slate-200">
                                <div className="text-slate-500 font-bold flex justify-center">CHA</div>
                                <div className="flex justify-center text-nowrap">
                                    {selectedMonster.charisma} (<span className={calculateModifier(selectedMonster.charisma) < 0 ? 'text-red-600' : 'text-emerald-600'}>
                                        {calculateModifier(selectedMonster.charisma)}
                                    </span>)
                                </div>
                            </div>
                        </h3>
                    </h2 >
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

                    {getObjects(selectedMonster.special_abilities)}
                    <h1 className="text-2xl font-bold bg-slate-300 px-2 pb-1 rounded-md">Actions</h1>
                    {getObjects(selectedMonster.actions)}
                </>
            )}
        </div >
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