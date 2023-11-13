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
        justifyContent="space-evenly"
        alignItems="center"
        //direction="column"
        direction={{ xs: 'column', sm: 'column', md: 'row' }}
        columnSpacing={{ sm: '2', lg: '5' }}
        sx={{ marginTop: '2%', height: '80vh' }}
      >
        <Grid item xs={1} sm={2} lg={3} sx={{ backgroundColor: '' }} height={'100%'}>
          <Card
            className={styles.box}
            sx={{
              width: '100%',
              height: '50%',
              backgroundColor: 'rgb(49, 66, 95, 0.7)',
              textAlign: 'center',
              borderRadius: '50px',
              marginTop: '50%',
            }}
            onClick={() => router.push('/admin')}
          >
            <Typography
              variant="h4"
              style={{ fontWeight: 'bold', color: 'white', marginTop: '30%' }}
            >
              Admin Panel
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={1} sm={2} lg={3} sx={{ backgroundColor: '' }} height={'100%'}>
          <Card
            className={styles.box}
            sx={{
              width: '100%',
              height: '50%',
              backgroundColor: 'rgb(49, 66, 95, 0.7)',
              textAlign: 'center',
              borderRadius: '50px',
              marginTop: '50%',
            }}
            onClick={() => router.push('/point_of_service')}
          >
            <Typography
              variant="h4"
              style={{ fontWeight: 'bold', color: 'white', marginTop: '30%' }}
            >
              POS
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={1} sm={2} lg={3} sx={{ backgroundColor: '' }} height={'100%'}>
          <Card
            className={styles.box}
            sx={{
              width: '100%',
              height: '50%',
              backgroundColor: 'rgb(49, 66, 95, 0.7)',
              textAlign: 'center',
              borderRadius: '50px',
              marginTop: '50%',
            }}
            onClick={() => router.push('/order_display')}
          >
            <Typography
              variant="h4"
              style={{ fontWeight: 'bold', color: 'white', marginTop: '30%' }}
            >
              Order Display
            </Typography>
          </Card>
        </Grid>
      </Grid>
      <CrumbParticles />
    </div>
  );
}
