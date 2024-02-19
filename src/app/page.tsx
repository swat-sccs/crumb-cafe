'use client';
import { Container, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import CrumbParticles from './components/particles';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Link from 'next/link';

//<Link href={page.link} key={page.name} passHref style={{ textDecoration: 'none' }}>
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
        direction={{ xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row' }}
        spacing={{ xs: 1, sm: 1, md: 3 }}
        columns={{ xs: 1, sm: 10, md: 11, lg: 12 }}
        columnSpacing={{ xs: 12, sm: 1, md: 1, lg: 5 }}
        sx={{ marginTop: '0%', height: '85vh', backgroundColor: '' }}
      >
        <Grid item xs={5} sm={3} md={3} lg={3} sx={{ backgroundColor: '' }}>
          <Link href="/admin/menu" passHref style={{ textDecoration: 'none' }}>
            <Card
              className={styles.box}
              sx={{
                width: '100%',
                height: '50%',
                backgroundColor: 'rgb(49, 66, 95, 0.7)',
                textAlign: 'center',
                borderRadius: '50px',
                marginTop: '20%',
              }}
            >
              <Grid
                container
                direction="column"
                justifyContent="space-evenly"
                alignItems="center"
                sx={{ height: '40vh' }}
              >
                <Typography
                  className={styles.font}
                  style={{ fontWeight: 'bold', color: 'white', fontSize: '2rem' }}
                >
                  Admin Panel
                </Typography>
              </Grid>
            </Card>
          </Link>
        </Grid>

        <Grid item xs={5} sm={3} md={3} lg={3} sx={{ backgroundColor: '' }}>
          <Link href="/point_of_sale" passHref style={{ textDecoration: 'none' }}>
            <Card
              className={styles.box}
              sx={{
                width: '100%',
                height: '50%',
                backgroundColor: 'rgb(49, 66, 95, 0.7)',
                textAlign: 'center',
                borderRadius: '50px',
                marginTop: '20%',
              }}
            >
              <Grid
                container
                direction="column"
                justifyContent="space-evenly"
                alignItems="center"
                sx={{ height: '40vh' }}
              >
                <Typography variant="h4" style={{ fontWeight: 'bold', color: 'white' }}>
                  POS
                </Typography>
              </Grid>
            </Card>
          </Link>
        </Grid>

        <Grid item xs={5} sm={3} md={3} lg={3} sx={{ backgroundColor: '' }}>
          <Card
            sx={{
              width: '100%',
              height: '40vh',
              textAlign: 'center',
              backgroundColor: 'rgb(49, 66, 95, 0)',
              borderRadius: '50px',
              marginTop: '20%',
            }}
          >
            <Grid container justifyContent="center" spacing={0} alignItems="center">
              <Grid item xs={12}>
                <Link href="/order_display" passHref style={{ textDecoration: 'none' }}>
                  <Card
                    className={styles.box}
                    sx={{
                      width: '100%',
                      height: '20vh',
                      backgroundColor: 'rgb(49, 66, 95, 0.7)',
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="h4"
                      style={{ fontWeight: 'bold', color: 'white', marginTop: '20%' }}
                    >
                      Order Display
                    </Typography>
                  </Card>
                </Link>
              </Grid>
              <Grid item xs={12}>
                {' '}
                <Link href="/kitchen_display" passHref style={{ textDecoration: 'none' }}>
                  <Card
                    className={styles.box}
                    sx={{
                      width: '100%',
                      height: '20vh',
                      backgroundColor: 'rgb(49, 66, 95, 0.7)',
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="h4"
                      style={{ fontWeight: 'bold', color: 'white', marginTop: '20%' }}
                    >
                      Kitchen Display
                    </Typography>
                  </Card>
                </Link>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <CrumbParticles />
    </div>
  );
}
