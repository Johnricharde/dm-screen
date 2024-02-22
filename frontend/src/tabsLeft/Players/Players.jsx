import Player from "./Player"

export default function Players() {
    return (
        <div>
            <div>
                <div className="mr-1 flex flex-col">
                    <div className="flex">
                        <h2 className="m-2 font-bold w-24">Player: </h2>
                        <input className="m-1 flex-grow rounded-sm" type="text" placeholder="Player's name..."></input>
                    </div>
                    <div className="flex">
                        <h2 className="m-2 font-bold w-24">Character: </h2>
                        <input className="m-1 flex-grow rounded-sm" type="text" placeholder="Character's name..."></input>
                    </div>
                    <div className="flex">
                        <h2 className="m-2 font-bold w-24">Class: </h2>
                        <input className="m-1 flex-grow rounded-sm" type="text" placeholder="Character's class..."></input>
                    </div>
                    <div className="flex">
                        <h2 className="m-2 font-bold w-24">Race: </h2>
                        <input className="m-1 flex-grow rounded-sm" type="text" placeholder="Character's race..."></input>
                    </div>
                    <div className="flex">
                        <h2 className="m-2 font-bold w-24">Notes: </h2>
                        <textarea className="m-1 flex-grow rounded-sm" type="textarea" placeholder="Notes..."></textarea>
                    </div>
                    <button className="flex-grow py-1 m-1 bg-gray-700 text-white">Add Player</button>
                </div>
            </div>
            <hr />
            <br />

            <Player />
            <Player />
        </div>
    )
}