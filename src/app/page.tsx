'use client';

import { AlignHorizontalCenter } from '@mui/icons-material';
import { Box, Card, Button, Typography, Grid } from '@mui/material';
import CrumbParticles from './components/particles';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Grid
        sx={{ backgroundColor: '', marginTop: '20%' }}
        container
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid container spacing={1} direction="column" justifyContent="center" alignItems="center">
          <Typography variant="h3" style={{ color: 'white' }}>
            Welcome!
          </Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold', color: 'white' }}>
            The Crumb Cafe Homepage
          </Typography>

          <Grid container spacing={1} direction="row" justifyContent="center" alignItems="center">
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
      </Grid>
      <CrumbParticles />
    </div>
  );
}
