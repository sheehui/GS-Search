import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

export function Result(props) {
  return (
    <Container maxWidth="md">
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
  );
}
