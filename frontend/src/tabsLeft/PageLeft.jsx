import Page from '../../src/Page';
import Players from "./Players/Players";
import Notes from "./Notes";
import Npcs from "./Npcs/Npcs";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

export default function PageLeft() {

    const [activeComponent, setActiveComponent] = useState("Players");

    return (
        <Page>
            <nav className="my-1 flex flex-wrap">
                <button className="flex-grow py-1 m-1 bg-gray-700 text-white" onClick={() => setActiveComponent("Players")}>PLAYERS</button>
                <button className="flex-grow py-1 m-1 bg-gray-700 text-white" onClick={() => setActiveComponent("Notes")}>NOTES</button>
                <button className="flex-grow py-1 m-1 bg-gray-700 text-white" onClick={() => setActiveComponent("Npcs")}>NPC</button>
            </nav>
            <hr />
            {activeComponent === 'Players' && <Players />}
            {activeComponent === 'Notes' && <Notes />}
            {activeComponent === 'Npcs' && <Npcs />}
        </Page>
    )
}