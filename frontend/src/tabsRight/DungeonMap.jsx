import dungeonMap from "../assets/crocadile_god_map.jpg";

export default function DungeonMap() {
    return (
        <div className="px-1 py-2">
            <img className="rounded-lg" src={dungeonMap} alt="Dungeon map" />
        </div>
    )
}
