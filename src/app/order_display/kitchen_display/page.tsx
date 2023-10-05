import { Box, Card, CardHeader, Container, Typography, useTheme } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import CardContent from '@mui/material/CardContent';
import styles from '../page.module.css';

const stuffs: { order_number: string; name: string }[] = [
  { order_number: '1', name: 'Tina Chen' },
  { order_number: '2', name: 'Helen Yin' },
  { order_number: '3', name: 'Summit' },
];

// testing for lot of orders: stuffs repeated 10 times
const lotOfStuffs: { order_number: string; name: string }[] = Array.from({ length: 10 }, () => [
  ...stuffs,
]).flat();

function StuffCard({ order_number, name }: { order_number: string; name: string }) {
  return (
    <Card sx={{ m: 2, borderRadius: '16px', borderColor: 'black', border: 1, width: 200, height: 300}}>
      <Typography
        variant="h5"
        bgcolor={'orange'}
        color={'white'}
        sx={{ width: '100%', borderStartEndRadius: '16px' }}
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
        <Grid container spacing={2}>
            <Grid xs={6}>
                <Card sx={{ m: 2, p: 1 }}>
                    <Typography variant="h4" textAlign="center">
                        In Progress
                    </Typography>
                </Card>
            </Grid>
            <Grid xs={6}>
                <Card sx={{ m: 2, p: 1 }}>
                    <Typography variant="h4" textAlign="center">
                        Completed
                    </Typography>
                </Card>
          </Grid>

          {lotOfStuffs.map((stuff) => (
            <Grid xs={3}>
              <StuffCard name={stuff.name} order_number={stuff.order_number} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );

}
