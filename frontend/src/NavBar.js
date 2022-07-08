import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {ThemeProvider} from '@mui/material/styles';

import { theme } from './Theme';

export function NavBar(props) {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <AppBar color="primary">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' }, color: '#fff' }}
            >
              GS
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Button href="/" key={"Home"} sx={{ color: '#fff' }}>
                  Home
                </Button>
                <Button href="/results" key={"Results"} sx={{ color: '#fff' }}>
                  Results
                </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* hack */}
        <Toolbar />
        <Toolbar />
      </Box>
    </ThemeProvider>
    
  );
}
