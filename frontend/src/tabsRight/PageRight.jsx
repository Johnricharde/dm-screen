import Page from '../../src/Page';
import Combat from "./Combat";
import DungeonMap from "./DungeonMap";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";


export default function PageRight() {
    // Use state to keep track of the active component
    const [activeComponent, setActiveComponent] = useState("DungeonMap");

    return (
        <Page>
            <nav>
                <button className="px-3 py-1 m-1 bg-gray-700 text-white" onClick={() => setActiveComponent("Combat")}>
                    COMBAT
                </button>
                <button className="px-3 py-1 m-1 bg-gray-700 text-white" onClick={() => setActiveComponent("DungeonMap")}>
                    DUNGEON MAP
                </button>
            </nav>
            <hr />
            {activeComponent === "DungeonMap" ? <DungeonMap /> : <Combat />}
            <hr />
        </Page>
    );
}