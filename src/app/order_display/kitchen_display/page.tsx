import { Box, Card, CardHeader, Container, Typography, useTheme, Slide } from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
} from '@mui/material';
// import { NavigateBeforeIcon, NavigateNextIcon, } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import CardContent from '@mui/material/CardContent';
import styles from '../page.module.css';

const stuffs: { order_number: string; name: string }[] = [
  { order_number: '1', name: 'Tina' },
  { order_number: '2', name: 'Helen' },
  { order_number: '3', name: 'Summit' },
  { order_number: '4', name: 'Tina' },
  { order_number: '5', name: 'Helen' },
  { order_number: '6', name: 'Summit' },
];

function StuffCard({ order_number, name }: { order_number: string; name: string }) {
  return (
    <Card sx={{ borderRadius: '10px', borderColor: 'black', border: 1, width: 200, height: 200 }}>
      <Typography
        variant="h5"
        bgcolor={'orange'}
        color={'white'}
        sx={{ width: '100%', borderStartEndRadius: '10px' }}
        textAlign={'center'}
      >
        {' '}
        {name}{' '}
      </Typography>
      <CardContent>
        <Typography variant="h5" textAlign={'center'}>
          {' '}
          {order_number}{' '}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  return (
    <Container>
      <Box>
        <Card elevation={2} sx={{ m: 2, p: 2, backgroundColor: '#31425f' }}>
          <Typography textAlign="center" variant="h3" color="white">
            Crumb Cafe Kitchen Portal
          </Typography>
        </Card>
        <Grid container spacing={2} alignItems="center">
          <Grid xs={6}>
            <Card sx={{ m: 1, p: 1 }}>
              <Typography variant="h4" textAlign="center">
                In Progress
              </Typography>
            </Card>
          </Grid>
          <Grid xs={6}>
            <Card sx={{ m: 1, p: 1 }}>
              <Typography variant="h4" textAlign="center">
                Completed
              </Typography>
            </Card>
          </Grid>
          <Grid xs={1}>
            <Stack spacing={2} sx={{ m: 1 }} direction="column" alignItems="center">
              <Button sx={{ rotate: 'z -90deg', width: '10rem' }} variant="contained">
                Newer Orders
              </Button>
            </Stack>
          </Grid>
          <Grid xs={10}>
            <Container sx={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
              {stuffs.map((stuff) => (
                <Grid key={stuff.order_number} xs={4}>
                  <StuffCard name={stuff.name} order_number={stuff.order_number} />
                </Grid>
              ))}
            </Container>
          </Grid>
          <Grid xs={1}>
            <Stack spacing={2} sx={{ m: 1 }} direction="column" alignItems="center">
              <Button sx={{ rotate: 'z 90deg', width: '10rem' }} variant="contained">
                Older Orders
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
