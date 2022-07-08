import Container from '@mui/material/Container';
import {useLocation} from 'react-router-dom';

import { NavBar } from './NavBar';
import { Result } from './Result';

export function ResultPage(props) {
  const location = useLocation();
  return (
    <>
        <header>
          <NavBar />
        </header>
        <body >
          <Container maxWidth="lg" >
            <Result link="#" title={location.state.title} descr="description!" />
          </Container>
        </body>
        
    </>
  );
}
