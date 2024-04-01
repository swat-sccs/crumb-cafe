import React from 'react';

import { Grid, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
//import Navigation from './navBarPOS.js';
import Navigation from '@/app/components/topBar';

export default function sideBar({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Grid container>
        <AppBar position="static">
          <Toolbar>
            <Grid container>
              <Grid item xs={1}>
                <Navigation></Navigation>
              </Grid>
            </Grid>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Container sx={{ marginTop: '2%' }}>{children}</Container>
      </Grid>
    </section>
  );
}
