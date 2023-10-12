//Side Bar
'use client';
import { Grid, Typography } from '@mui/material';
import Navigation from '../components/navigation';
export default function sideBar({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Grid container>
        <Grid
          item
          xs={3}
          sm={1.2}
          md={1.2}
          lg={1.5}
          xl={1}
          justifyContent="flex-start"
          alignItems="center"
          sx={{ backgroundColor: '' }}
        >
          <Navigation></Navigation>
        </Grid>
        <Grid
          item
          xs={7}
          sm={10.8}
          md={10.8}
          lg={10.5}
          xl={11}
          justifyContent="flex-start"
          alignItems="center"
          sx={{ backgroundColor: '' }}
        >
          {children}
        </Grid>
      </Grid>
    </section>
  );
}
