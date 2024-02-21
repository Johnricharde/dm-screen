// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Search = ({ apiEndpoint, fetchSelectedEntity }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
    const inputRef = useRef(null);

    useEffect(() => {
        // Fetch suggestions based on the search term
        if (searchTerm.length > 0) {
            axios.get(`${apiEndpoint}?name=${searchTerm}`)
                .then(response => {
                    // Filter suggestions that start with the search term
                    const startsWithSearchTerm = response.data.results.filter(result => result.name.toLowerCase().startsWith(searchTerm.toLowerCase()));

                    // Filter suggestions that include the search term but doesn't start with it
                    const includesSearchTerm = response.data.results.filter(result => !result.name.toLowerCase().startsWith(searchTerm.toLowerCase()) && result.name.toLowerCase().includes(searchTerm.toLowerCase()));

                    // Combine the two sets of suggestions, prioritizing startsWithSearchTerm
                    const combinedSuggestions = startsWithSearchTerm.concat(includesSearchTerm);

                    setSuggestions(combinedSuggestions);
                })
                .catch(error => console.error("Error fetching suggestions:", error));
        } else {
            setSuggestions([]);
        }
        setSelectedSuggestionIndex(-1);
    }, [searchTerm, apiEndpoint]);



    // Handles keyboard events for navigating through autocomplete suggestions and selecting a monster
    function handleKeyDown(event) {
        if (event.key === "ArrowUp") {
            event.preventDefault();
            setSelectedSuggestionIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1));
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            setSelectedSuggestionIndex(prevIndex => (prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0));
        } else if (event.key === "Enter" && selectedSuggestionIndex !== -1) {
            event.preventDefault();
            handleSelectEntity(suggestions[selectedSuggestionIndex]);
        }
    }   // Handles the selection of a monster from the dropdown list or via keyboard navigation
    function handleSelectEntity(entity) {
        setSearchTerm(entity.name); // Update the search term with the selected entity's name
        fetchSelectedEntity(entity.index); // Fetch details of the selected entity
        setSuggestions([]); // Clear suggestions when an entity is selected
        setSearchTerm(""); // Clear search term to hide the dropdown box
        inputRef.current.focus(); // Set focus back to the input field after selection
    }



    return (
        <div>
            {/* Search bar with autocomplete */}
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={inputRef}
            />
            {/* Dropdown for autocomplete suggestions */}
            {suggestions.length > 0 && (
                <div className="dropdown">
                    {suggestions.map((entity, index) => (
                        <div
                            key={index}
                            className={`dropdown-row ${index === selectedSuggestionIndex ? "selected bg-gray-200" : ""}`}
                            onClick={() => handleSelectEntity(entity)}
                        >
                            {entity.name}
                        </div>
                    ))}
                </div>
            )}
            <hr />
        </div>
    );
};

export default Search;