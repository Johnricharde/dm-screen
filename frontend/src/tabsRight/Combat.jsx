export default function Combat() {
    return (
        <div>
            <h2 className="font-bold">Initiative:</h2>
            <h2>| Biff | <span className="font-bold">Goblin 1</span> | Aragorn | Goblin Chief | Goblin 2 |</h2>
            <h2 className="font-bold">Goblin</h2>
            <h2><span className="font-bold">Armor Class: </span>15 (leather armor, shield)</h2>
            <h2><span className="font-bold">Hit Points: </span>5 / 7</h2>
            <h2><span className="font-bold">Speed: </span>30 ft.</h2>
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