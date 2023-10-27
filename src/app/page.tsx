'use client';
import { Button, Typography, Grid } from '@mui/material';
import CrumbParticles from './components/particles';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ backgroundColor: '', width: '100vw', marginTop: '4%' }}
      >
        <Grid item>
          <Typography variant="h3" style={{ color: 'white' }} align="center">
            Welcome!
          </Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold', color: 'white' }}>
            The Crumb Cafe Homepage
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: '5%' }}
      >
        <Button
          variant="contained"
          size="large"
          sx={{
            m: 1,
            p: 2,
            width: '40%',
            height: '300%',
            fontSize: '300%',
            backgroundColor: 'rgb(49, 66, 95, 0.7)',
          }}
          onClick={() => router.push('/admin')}
        >
          Admin Page
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{
            m: 1,
            p: 2,
            width: '40%',
            height: '200%',
            fontSize: '300%',
            backgroundColor: 'rgb(49, 66, 95, 0.7)',
          }}
          onClick={() => router.push('/point_of_service')}
        >
          POS
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{
            m: 1,
            p: 2,
            width: '40%',
            height: '200%',
            fontSize: '300%',
            backgroundColor: 'rgb(49, 66, 95, 0.7)',
          }}
          onClick={() => router.push('/order_display')}
        >
          Kitchen
        </Button>
      </Grid>
      <CrumbParticles />
    </div>
  );
}
