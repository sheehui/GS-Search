import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import {ThemeProvider} from '@mui/material/styles';

import { theme } from './Theme';

export function Result(props) {
    console.log(props)
  return (
    <ThemeProvider theme={theme}>
        <Container maxWidth="md" style={{marginBottom: "20px"}}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Link href={props.link}>
                        <Typography variant="h5" component="div">
                            {props.title}
                        </Typography>
                    </Link>
                    <Typography variant="body2">
                        {props.descr}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    </ThemeProvider>
        
  );
}
