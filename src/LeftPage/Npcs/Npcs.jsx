import Npc from "./Npc"

export default function Npcs() {
    return (
        <div>
            <input type="text" placeholder="Search.."></input>
            <hr />
            <Npc />
            <Npc />
            <Npc />
        </div>
    )
}