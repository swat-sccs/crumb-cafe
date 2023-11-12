'use client';
import { TextField, Box, Card, Container, Button, Typography, Grid } from '@mui/material';

export default function Home() {
  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <Typography
        sx={{ marginTop: '5%', textAlign: 'center' }}
        variant="h2"
        style={{ fontWeight: 'bold', color: 'white' }}
      >
        Welcome to Crumb!
      </Typography>

      <Grid
        container
        direction="column"
        alignItems="center"
        mt={5}
        sx={{ backgroundColor: '', width: '100vw', height: '30vh' }}
      >
        <Grid item>
          <TextField id="outlined-basic" label="Username" variant="outlined" />
        </Grid>

        <Grid item mt={2}>
          <TextField id="outlined-basic" label="Password" variant="outlined" type="password" />
        </Grid>

        <Grid item mt={3}>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: '200px', height: '60px', fontWeight: 'bold' }}
          >
            Sign In
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
