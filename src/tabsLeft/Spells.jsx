// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import Search from "./Search";

const Spells = () => {
    const [selectedSpell, setSelectedSpell] = useState(null);

    async function fetchSelectedMonster(index) {
        try {
            const response = await axios.get(`https://www.dnd5eapi.co/api/spells/${index}`);
            setSelectedSpell(response.data);
        } catch (error) {
            console.error("Error fetching spell details:", error);
        }
    }

    // Helper function to convert numeric level to string format
    const formatSpellLevel = (level) => (level === 0 ? "Cantrip" : `${level}${[undefined, "st", "nd", "rd"][(level % 100 - 20) % 10] || "th"} level`);

    return (
        <div>
            {/* Search bar with autocomplete */}
            <Search
                apiEndpoint="https://www.dnd5eapi.co/api/Spells"
                fetchSelectedEntity={fetchSelectedMonster} />

            {/* Display the filtered spell */}
            {selectedSpell && (
                <>
                    <h1 className="text-2xl font-bold">{selectedSpell.name}</h1>
                    <h2 className="italic">{formatSpellLevel(selectedSpell.level)} {selectedSpell.school.name}</h2>
                    <h2><span className="font-bold">Casting Time: </span>{selectedSpell.casting_time}</h2>
                    <h2><span className="font-bold">Range: </span>{selectedSpell.range}</h2>
                    <h2><span className="font-bold">Components: </span>{selectedSpell.components.join(', ')}</h2>
                    <h2><span className="font-bold">Duration: </span>{selectedSpell.duration}</h2>
                    <br />
                    <p>{selectedSpell.desc}</p>
                    <br />
                    <h2><span className="font-bold">At Higher Levels. </span>{selectedSpell.higher_level}</h2>
                    <hr />
                </>
            )}
        </div>
    );
};

export default Spells;