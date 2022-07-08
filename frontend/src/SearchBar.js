import React from "react";
import "./SearchBar.css"
import { useState } from "react"
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
            PageSize: 50
        };
        const resp = await sendCommand(query);
        
        navigate("/results", { state: {
            response: resp,
            query: query
        } });
       
    }
    
    return (
        <form class="container" onSubmit={handleSearch} style={{marginTop: "80px"}}>
            <h2 style={{color: "#749ac7", fontSize: "70px", marginBottom: "20px"}}>GS Search</h2>
            <input id="search-bar" type="search" placeholder="Search" onChange={e => setInput(e.target.value)} />
            <button type="submit" class="buttons" style={{backgroundColor:"#D3D3D3", fontSize: "13px", marginTop: "25px"}}>I'm Feeling Lucky Today!</button>
        </form>
    )
}

export default SearchBar;