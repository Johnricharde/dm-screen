export default function Spells() {
    return (
        <div>
            <input type="text" placeholder="Search.."></input>
            <hr />
            <h1 className="text-2xl font-bold">Burning Hands</h1>
            <h2 className="italic">1st-level evocation</h2>
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
                aren't being worn or carried.
            </p>
            <br />
            <h2><span className="font-bold">At Higher Levels. </span>
                When you cast this spell using a
                spell slot of 2nd level or higher, the damage increases by
                1d6 for each slot level above 1st.
            </h2>
            <hr />
        </div>
    )
}