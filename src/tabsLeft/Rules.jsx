// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import Search from "./Search";

export default function Rules() {
    const [selectedRule, setSelectedRule] = useState(null);

    async function fetchSelectedRule(index) {
        try {
            const response = await axios.get(`https://www.dnd5eapi.co/api/rules/${index}`);
            setSelectedRule(response.data);
        } catch (error) {
            console.error("Error fetching rule details:", error);
        }
    }

    return (
        <div>
            {/* Search bar with autocomplete */}
            <Search
                apiEndpoint="https://www.dnd5eapi.co/api/rules"
                fetchSelectedEntity={fetchSelectedRule} />

            {/* Display the filtered spell */}
            {selectedRule && (
                <>
                    <h1 className="text-2xl font-bold">{selectedRule.name}</h1>
                    <p>{selectedRule.desc}</p>
                    <br />
                    <hr />
                </>
            )}
        </div>
    );
}