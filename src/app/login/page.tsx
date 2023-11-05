'use client';
import { TextField, Box, Card, Container, Button, Typography, Grid } from '@mui/material';

export default function Home() {
  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <Card>
        <Typography
          sx={{ marginTop: '5%', textAlign: 'center' }}
          variant="h2"
          style={{ fontWeight: 'bold', color: 'white' }}
        >
          Welcome to Crumb!
        </Typography>
      </Card>

      <Grid
        alignItems="center"
        justifyContent="space-evenly"
        direction="column"
        container
        mt={5}
        item
        sx={{ backgroundColor: '', width: '100vw', height: '30vh' }}
      >
        <TextField id="outlined-basic" label="Username" variant="outlined">
          {' '}
        </TextField>

        <TextField id="outlined-basic" label="Password" variant="outlined" type="password" />
      </Grid>
    </Grid>
  );
}
