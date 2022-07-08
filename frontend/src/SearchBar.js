import React from "react";
import "./SearchBar.css"
import { useState, useEffect } from "react"
import { QueryCommand } from "@aws-sdk/client-kendra"; 
import { useNavigate } from "react-router-dom";


function SearchBar(props) {
    const [ input, setInput ] = useState( "" );
    const [ response, setResponse ] = useState( null )
    const kendraClient = props.client
    // const [ kendraClient, setKendraClient ] = useState( props.client );
    let navigate = useNavigate();
    // console.log("aksdfnalkd", kendraClient)
    const sendCommand = async ( query ) => {
        const command = new QueryCommand(query);
        const response = await kendraClient.send( command );
        setResponse(response)
    }

    // useEffect( () => {
    //     const sendCommand = async ( query ) => {
    //         const command = new QueryCommand(query);
    //         const response = await kendraClient.send( command );
    //         setResponse(response)
    //     }
    //     const query = {
    //         IndexId: "58426b77-30be-4b78-8240-13017bb7f40c",
    //         QueryText: "banker",
    //         PageNumber: 1
    //     };
    //     sendCommand(query);
    // }, [kendraClient])

    async function handleSearch( e ) {
        e.preventDefault()
        console.log( "handle search" );
        console.log( input );
        const query = {
            IndexId: "58426b77-30be-4b78-8240-13017bb7f40c",
            QueryText: input,
            PageNumber: 1
        };
        await sendCommand(query);
        console.log(response);
        // navigate("/results", { state: {
        //     response: response
        // } });
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