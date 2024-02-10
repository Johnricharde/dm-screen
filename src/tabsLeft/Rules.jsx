// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import Search from "./Search";

export default function Rules() {
    const [selectedRule, setSelectedRule] = useState(null);

    async function fetchSelectedRule(index) {
        try {
            const response = await axios.get(`https://www.dnd5eapi.co/api/rule-sections/${index}`);
            setSelectedRule(response.data);
        } catch (error) {
            console.error("Error fetching rule details:", error);
        }
    }



    // function flattenObj(obj) {
    //     let result = {};
    //     for (const i in obj) {
    //         if (typeof obj[i] === "object" && !Array.isArray(obj[i])) {
    //             const temp = flattenObj(obj[i]);
    //             for (const j in temp) {
    //                 result[i + "/" + j] = temp[j];
    //             }
    //         } else {
    //             result[i] = obj[i];
    //         }
    //     }
    //     return result;
    // }


    return (
        <div>
            {/* Search bar with autocomplete */}
            <Search
                apiEndpoint="https://www.dnd5eapi.co/api/rule-sections"
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