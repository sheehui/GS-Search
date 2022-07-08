import Container from '@mui/material/Container';
import {useLocation} from 'react-router-dom';

import { NavBar } from './NavBar';
import { Result } from './Result';

export function ResultPage(props) {
  const location = useLocation();
  if (!location.state || !location.state.response) {
    return (
      <>
        <header>
          <NavBar />
        </header>
        <body >
          <Container maxWidth="lg" >
            <p>No Results!</p>
          </Container>
        </body>
    </>
    )
  }
  return (
    <>
        <header>
          <NavBar />
        </header>
        <body >
          <Container maxWidth="lg" >
            {location.state.response.ResultItems.map((resp, i) => {
              return <Result key={i} link={resp.DocumentURI} title={resp.DocumentTitle.text} descr={resp.DocumentExcerpt.text} />
            })}
          </Container>
        </body>
    </>
  );
}
