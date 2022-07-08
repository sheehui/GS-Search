import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import {ThemeProvider} from '@mui/material/styles';

import { theme } from './Theme';

export function NavBar(props) {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <AppBar color="primary">
          <Toolbar>
            <Button href="/">
              <img src="./image.png" style={{ height: "35px" }} alt="Goldman Sachs"/>
            </Button>
          </Toolbar>
        </AppBar>
        {/* hack */}
        <Toolbar />
        <Toolbar />
      </Box>
    </ThemeProvider>
    
  );
}
