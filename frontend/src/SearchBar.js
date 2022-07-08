import React from "react";
import "./SearchBar.css"
import { useState, useEffect } from "react"
import { QueryCommand } from "@aws-sdk/client-kendra"; 
import { useNavigate } from "react-router-dom";


function SearchBar(props) {
    const [ input, setInput ] = useState( "" );
    const kendraClient = props.client
    let navigate = useNavigate();
    const sendCommand = async ( query ) => {
        const command = new QueryCommand(query);
        const response = await kendraClient.send( command );
        return response
    }

     async function handleSearch( e ) {
        e.preventDefault()
        console.log( "handle search" );
        console.log( input );
        const query = {
            IndexId: "58426b77-30be-4b78-8240-13017bb7f40c",
            QueryText: input,
            PageNumber: 1
        };
        const resp = await sendCommand(query);
        console.log(resp)
        
        navigate("/results", { state: {
            response: resp
        } });
       
    }
    
    return (
        <form class="container" onSubmit={handleSearch}>
            <h2 style={{color: "#749ac7"}}>GS Search</h2>
            <input id="search-bar" type="search" placeholder="Search" onChange={e => setInput(e.target.value)} />
            <button type="submit" class="buttons">I'm feeling lucky today!</button>
        </form>
    )
}

export default SearchBar;