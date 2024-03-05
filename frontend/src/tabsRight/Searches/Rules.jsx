// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedRule.desc}</ReactMarkdown>
                    <br />
                </>
            )}
        </div>
    );
}