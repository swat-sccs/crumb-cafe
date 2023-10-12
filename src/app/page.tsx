'use client';
import { Button, Typography, Grid } from '@mui/material';
import CrumbParticles from './components/particles';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: '', height: '100vh', width: '100vw' }}
      >
        <Grid item>
          <Typography variant="h3" style={{ color: 'white' }} align="center">
            Welcome!
          </Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold', color: 'white' }}>
            The Crumb Cafe Homepage
          </Typography>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            size="large"
            sx={{ m: 1, p: 2, width: '130px' }}
            onClick={() => router.push('/admin/dash')}
          >
            Admin Page
          </Button>
          <Button
            variant="contained"
            size="large"
            sx={{ m: 1, p: 2, width: '130px' }}
            onClick={() => router.push('/point_of_service')}
          >
            POS
          </Button>
          <Button
            variant="contained"
            size="large"
            sx={{ m: 1, p: 2, width: '130px' }}
            onClick={() => router.push('/order_display')}
          >
            Kitchen
          </Button>
        </Grid>
      </Grid>
      <CrumbParticles />
    </div>
  );
}
