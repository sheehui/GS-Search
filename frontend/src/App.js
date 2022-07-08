import { KendraClient } from "@aws-sdk/client-kendra"; 
import SearchBar from "./SearchBar"
import { NavBar } from './NavBar';
import { useState, useEffect } from "react"

function App() {
  const [ client, setClient ] = useState( null ) // kendra client
  useEffect( () => {
    async function setKendra() {
      console.log( 'init kendra' );
      
      const cred = {
        accessKeyId: "AKIAU5LMWJ3PGZE7XV5L",
        secretAccessKey: "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",
      };

      const kendraClient = new KendraClient( {
        credentials: cred,
        region: "us-west-2"
      } );
      setClient( kendraClient )
    }
    // a client can be shared by different commands.
    setKendra();
  }, [] );
  
  
  return ( 
    <div>
      <header>
        <NavBar />
      </header>
      <body style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <SearchBar client={client} />
      </body>
    </div >
  );
}

export default App;
