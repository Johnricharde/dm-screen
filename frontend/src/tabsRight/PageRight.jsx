import Page from '../../src/Page';
import Monsters from "./Searches/Monsters";
import Spells from "./Searches/Spells";
import Rules from "./Searches/Rules";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";


export default function PageRight() {
    // Use state to keep track of the active component
    const [activeComponent, setActiveComponent] = useState("Monsters");

    return (
        <Page>
            <nav className="my-1 flex flex-wrap">
                <button className="flex-grow py-1 m-1 bg-red-800 text-white" onClick={() => setActiveComponent("Monsters")}>MONSTERS</button>
                <button className="flex-grow py-1 m-1 bg-red-800 text-white" onClick={() => setActiveComponent("Spells")}>SPELLS</button>
                <button className="flex-grow py-1 m-1 bg-red-800 text-white" onClick={() => setActiveComponent("Rules")}>RULES</button>
            </nav>
            <hr />
            {activeComponent === 'Monsters' && <Monsters />}
            {activeComponent === 'Spells' && <Spells />}
            {activeComponent === 'Rules' && <Rules />}
        </Page>
    );
}