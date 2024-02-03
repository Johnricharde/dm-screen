// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

const Spells = () => {
    const spellsListUrl = "https://www.dnd5eapi.co/api/spells";
    const [searchTerm, setSearchTerm] = useState('');
    const [spellsList, setSpellsList] = useState([]);
    const [selectedSpell, setSelectedSpell] = useState(null);

    useEffect(() => {
        // Fetch the spells list
        fetch(spellsListUrl)
            .then(response => response.json())
            .then(data => setSpellsList(data.results))
            .catch(error => console.error('Error fetching spells list:', error));
    }, []);

    useEffect(() => {
        // Fetch details for the selected spell when searchTerm changes
        const fetchSelectedSpell = async () => {
            if (searchTerm && spellsList.length > 0) {
                const selectedSpellIndex = spellsList.find(spell => spell.name.toLowerCase().startsWith(searchTerm.toLowerCase()))?.index;
                if (selectedSpellIndex) {
                    try {
                        const response = await fetch(`https://www.dnd5eapi.co/api/spells/${selectedSpellIndex}`);
                        const data = await response.json();
                        setSelectedSpell(data);
                    } catch (error) {
                        console.error('Error fetching spell details:', error);
                    }
                }
            } else {
                setSelectedSpell(null);
            }
        };

        fetchSelectedSpell();
    }, [searchTerm, spellsList]);

    // Helper function to convert numeric level to string format
    const formatSpellLevel = (level) => (level === 0 ? "Cantrip" : `${level}${[undefined, "st", "nd", "rd"][(level % 100 - 20) % 10] || "th"} level`);

    return (
        <div>
            {/* Search bar */}
            <input
                type="text"
                placeholder="Search for a spell..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <hr />

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