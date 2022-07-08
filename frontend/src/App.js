import logo from './logo.svg';
import './App.css';
import { KendraClient, QueryCommand } from "@aws-sdk/client-kendra"; 
import { Result } from "./Result.js";
import SearchBar from "./SearchBar"
import { NavBar } from './NavBar';

async function hi() {
  console.log('hi');
    const cred = {
      accessKeyId: "AKIAU5LMWJ3PGZE7XV5L",
      secretAccessKey: "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",
    };
    const client = new KendraClient({
      credentials: cred,
      region: "us-west-2"
    });
    const input = {
      IndexId: "58426b77-30be-4b78-8240-13017bb7f40c", 
      QueryText: "kafka",
      PageNumber: 1
    };
    const command = new QueryCommand(input);
    const response = await client.send(command);
    console.log(response);
}

function App() {
  // a client can be shared by different commands.
  hi();
  return (  
    <div className="App">
      <NavBar />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <body>
        <Result link="#" title="title!" descr="description!" />
        <SearchBar />
      </body>
    </div>
  );
}

export default App;
