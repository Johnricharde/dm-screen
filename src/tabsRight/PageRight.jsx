import Page from '../Page';
import Combat from "./Combat";
import DungeonMap from "./DungeonMap";
import React, { useState } from "react";


export default function PageRight() {
    // Use state to keep track of the active component
    const [activeComponent, setActiveComponent] = useState("DungeonMap");

    return (
        <Page>
            <nav>
                <button onClick={() => setActiveComponent("Combat")}>
                    COMBAT
                </button>
                <button onClick={() => setActiveComponent("DungeonMap")}>
                    DUNGEON MAP
                </button>
            </nav>
            <hr />
            {activeComponent === "DungeonMap" ? <DungeonMap /> : <Combat />}
            <hr />
        </Page>
    );
}