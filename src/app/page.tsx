'use client';
import { Button, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
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
          <Typography variant="h2" style={{ fontWeight: 'bold', color: 'white' }}>
            Crumb Cafe
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{ marginTop: '2%', height: '70vh' }}
      >
        <Card
          className={styles.box}
          sx={{
            width: '25%',
            height: '50%',
            fontSize: '300%',
            backgroundColor: 'rgb(49, 66, 95, 0.7)',
            textAlign: 'center',
            borderRadius: '50px',
          }}
          onClick={() => router.push('/admin')}
        >
          <Typography
            sx={{ marginTop: '35%' }}
            variant="h4"
            style={{ fontWeight: 'bold', color: 'white' }}
          >
            Admin Panel
          </Typography>
        </Card>

        <Card
          className={styles.box}
          sx={{
            width: '25%',
            height: '50%',
            fontSize: '300%',
            backgroundColor: 'rgb(49, 66, 95, 0.7)',
            textAlign: 'center',
            borderRadius: '50px',
          }}
          onClick={() => router.push('/point_of_service')}
        >
          <Typography
            sx={{ marginTop: '35%' }}
            variant="h4"
            style={{ fontWeight: 'bold', color: 'white' }}
          >
            POS
          </Typography>
        </Card>
        <Card
          className={styles.box}
          sx={{
            width: '25%',
            height: '50%',
            fontSize: '300%',
            backgroundColor: 'rgb(49, 66, 95, 0.7)',
            textAlign: 'center',
            borderRadius: '50px',
          }}
          onClick={() => router.push('/order_display')}
        >
          <Typography
            sx={{ marginTop: '35%' }}
            variant="h4"
            style={{ fontWeight: 'bold', color: 'white' }}
          >
            Order Display
          </Typography>
        </Card>
      </Grid>
      <CrumbParticles />
    </div>
  );
}
