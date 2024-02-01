export default function Monsters() {
    return (
        <div>
            <input type="text" placeholder="Search.."></input>
            <hr />
            <h1>Goblin</h1>
            <h2 className="italic">Small Humanoid (Goblinoid), Neutral Evil</h2>
            <hr />
            <br />
            <h2><span className="font-bold">Armor Class</span> 15 (leather armor, shield)</h2>
            <h2><span className="font-bold">Hit Points</span> 7 (2d6)</h2>
            <h2><span className="font-bold">Speed</span> 30 ft.</h2>
            <h2><span className="font-bold">Initiative</span> +2</h2>
            <hr />
            <br />
            <h2 className="font-bold">STR | DEX | CON | INT | WIS | CHA</h2>
            <h3>8 (-1) | 14 (+2) | 10 (+0) | 10 (+0) | 8 (-1) | 8 (-1)</h3>
            <hr />
            <br />
            <h2><span className="font-bold">Skills</span> Stealth +6</h2>
            <h2><span className="font-bold">Senses</span> Darkvision 60 ft., Passive Perception 9</h2>
            <h2><span className="font-bold">Languages</span> Common, Goblin</h2>
            <h2><span className="font-bold">Challenge</span> 1/4 (50 XP)</h2>
            <h2><span className="font-bold">Proficiency Bonus</span> +2</h2>
            <hr />
            <br />
            <p> <span className="font-bold italic">Nimble Escape. </span>The goblin can take the Disengage or Hide action as a bonus action on each of its turns.</p>
            <br />
            <h1 className="text-2xl font-bold">Actions</h1>
            <p> <span className="font-bold italic">Scimitar. </span>Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage.</p>
            <p> <span className="font-bold italic">Shortbow. </span>Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.</p>
        </div>
    )
}