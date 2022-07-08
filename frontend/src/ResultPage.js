import { useEffect, useState } from "react"
import Container from '@mui/material/Container';
import {useLocation} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import { NavBar } from './NavBar';
import { Result } from './Result';

function sliceResponse(pageNum, results) {
  console.log("slicing", results)
  if (!results) {
    console.log("results is null")
    return null;
  }
  const start = (pageNum - 1) * 10;
  const endExclusive = Math.min(32, (pageNum) * 10);
  const arr = [];
  console.log(start, endExclusive);
  for (var i = start; i < endExclusive; i++) {
    arr.push(results[i]);
  }
  console.log(arr);
  return arr;
}

export function ResultPage(props) {
  const location = useLocation();
  const [response, setResponse] = useState(location.state.response);
  const [dataDisplay, setDataDisplay] = useState();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    console.log("bef",value, dataDisplay)
    setLoading(true);
    setPage(value);
    setDataDisplay(sliceResponse(value, response["ResultItems"]));
    setLoading(false);
    console.log("aft",value, dataDisplay);
  };

  useEffect(() => {
    if (!response || !response.ResultItems) {
      console.log("failed to set response");
      return;
    }
    console.log("set response to", response);
    setDataDisplay(sliceResponse(1, response["ResultItems"]));
    console.log("effect", dataDisplay);
    setLoading(false);
  }, []);

  if (!response) {
    return (
      <>
        <header>
          <NavBar />
        </header>
        <body >
          <Container maxWidth="lg" >
            <Typography>No Results!</Typography>
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
            {!loading && dataDisplay.map((resp, i) => {
              return <Result key={i} link={resp.DocumentURI} title={resp.DocumentTitle.Text} descr={resp.DocumentExcerpt.Text} />
            })}
            <Pagination onChange={handleChange} page={page} count={5} variant="outlined" color="primary" />
          </Container>
        </body>
    </>
  );
}
