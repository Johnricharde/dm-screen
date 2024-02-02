export default function Rules() {
    return (
        <div>
            <input type="text" placeholder="Search.."></input>
            <hr />
            <h1 className="text-2xl font-bold">Petrified</h1>
            <ul className="list-disc list-inside">
                <li>A petrified creature is transformed, along with any
                    nonmagical object it is wearing or carrying, into a
                    solid inanimate substance (usually stone). Its weight
                    increases by a factor of ten, and it ceases aging.</li>
                <li>The creature is incapacitated (see the condition), can't
                    move or speak, and is unaware of its surroundings.</li>
                <li>Attack rolls against the creature have advantage.</li>
                <li>The creature automatically fails Strength and Dexterity
                    saving throws.</li>
                <li>The creature has resistance to all damage.</li>
                <li>The creature is immune to poison and disease,
                    although a poison or disease already in its system
                    is suspended, not neutralized.</li>
            </ul>
            <hr />
        </div>
    )
}