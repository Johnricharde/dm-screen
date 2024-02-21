import dungeonMap from "../assets/crocadile_god_map.jpg";

export default function DungeonMap() {
    return (
        <div className="p-1">
            <img className="rounded-lg" src={dungeonMap} alt="Dungeon map" />
        </div>
    )
}
