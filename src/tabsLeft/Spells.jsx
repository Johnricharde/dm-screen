import React, { useState, useEffect } from 'react';

const Spells = () => {
    const spellsListUrl = "https://www.dnd5eapi.co/api/spells";
    const [searchTerm, setSearchTerm] = useState('');
    const [spellsList, setSpellsList] = useState([]);

    useEffect(() => {
        // Fetch the spells list
        fetch(spellsListUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Assuming the data structure has a property named 'results' containing the spells
                setSpellsList(data.results);
            })
            .catch(error => {
                console.error('Error fetching spells list:', error);
            });
    }, []);

    // Filter spell based on search term
    const filteredSpell = spellsList.find(spell => spell.name.toLowerCase().includes(searchTerm.toLowerCase()));

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
            {filteredSpell && (
                <>
                    <h1 className="text-2xl font-bold">{filteredSpell.name}</h1>
                    <h2 className="italic">spell level: {filteredSpell.level}</h2>
                    <h2 className="italic">spell school: {filteredSpell.school}</h2>
                    <h2><span className="font-bold">Casting Time: </span>
                        1 action</h2>
                    <h2><span className="font-bold">Range: </span>
                        Self (15-foot cone)</h2>
                    <h2><span className="font-bold">Components: </span>
                        V, S</h2>
                    <h2><span className="font-bold">Duration: </span>
                        Instantaneous</h2>
                    <br />
                    <p>
                        As you hold your hands with thumbs touching and fingers
                        spread, a thin sheet of flames shoots forth from your outstretched fingertips. Each creature in a 15-foot cone must
                        make a Dexterity saving throw. A creature takes 3d6 fire
                        damage on a failed save, or half as much damage on a
                        successful one.
                        The fire ignites any flammable objects in the area that
                        arent being worn or carried.
                    </p>
                    <br />
                    <h2><span className="font-bold">At Higher Levels. </span>
                        When you cast this spell using a
                        spell slot of 2nd level or higher, the damage increases by
                        1d6 for each slot level above 1st.
                    </h2>
                    <hr />
                </>
            )}
        </div>
    );
};

export default Spells;
// return (
//     <div>
//         <input type="text" placeholder="Search.."></input>
//         <hr />

//         <h1 className="text-2xl font-bold">Burning Hands</h1>
//         <h2 className="italic">1st-level evocation</h2>
//         <h2><span className="font-bold">Casting Time: </span>
//             1 action</h2>
//         <h2><span className="font-bold">Range: </span>
//             Self (15-foot cone)</h2>
//         <h2><span className="font-bold">Components: </span>
//             V, S</h2>
//         <h2><span className="font-bold">Duration: </span>
//             Instantaneous</h2>
//         <br />
//         <p>
//             As you hold your hands with thumbs touching and fingers
//             spread, a thin sheet of flames shoots forth from your outstretched fingertips. Each creature in a 15-foot cone must
//             make a Dexterity saving throw. A creature takes 3d6 fire
//             damage on a failed save, or half as much damage on a
//             successful one.
//             The fire ignites any flammable objects in the area that
//             arent being worn or carried.
//         </p>
//         <br />
//         <h2><span className="font-bold">At Higher Levels. </span>
//             When you cast this spell using a
//             spell slot of 2nd level or higher, the damage increases by
//             1d6 for each slot level above 1st.
//         </h2>
//         <hr />
//     </div>
// )
