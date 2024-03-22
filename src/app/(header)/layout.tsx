'use client';
import { Grid, Toolbar, Typography, Button, Container } from '@mui/material';
import { useSession } from 'next-auth/react';
import Navigation from '@/app/components/topBar';

export default function sideBar({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Container sx={{ width: '85vw', height: '85vh', mt: '2%' }}>{children}</Container>
    </section>
  );
}

/*Old

<Grid container>
        <Grid
          item
          xs={1}
          sm={1}
          md={1}
          lg={1}
          xl={1}
          justifyContent="center"
          alignItems="center"
          sx={{ backgroundColor: '' }}
        >
          <Navigation></Navigation>
        </Grid>

        <Grid
        item
        xs={10}
        sm={10}
        md={10}
        lg={10}
        xl={10}
        justifyContent="flex-start"
        alignItems="center"
        sx={{ backgroundColor: '' }}
      >
        {children}
      </Grid>

      </Grid>

    */
