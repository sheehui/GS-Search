import React from "react";
import "./SearchBar.css"
import { useState } from "react"

function SearchBar() {
    const [ input, setInput ] = useState( "" );
    
    function handleSearch() {
        // redirect
        console.log( "handle search" );
        console.log( input );
    }

    return (
        <form class="container" onSubmit={handleSearch}>
            <h2>GS Search</h2>
            <input id="search-bar" type="search" onChange={e => setInput(e.target.value)}/>
            <button type="submit" class="buttons">I'm feeling lucky today!</button>
        </form>
    )
}

export default SearchBar;