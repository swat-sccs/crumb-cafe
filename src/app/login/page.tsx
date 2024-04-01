'use client';
import React from 'react';
import { TextField, Button, Typography, Grid, Card } from '@mui/material';
import { useSession } from 'next-auth/react';

export default function Login() {
  const { data: session, status } = useSession();
  let authenticated;
  let loginLink;
  let nameButton;

  return (
    <div>
      <Typography
        sx={{
          marginTop: '15%',
          textAlign: 'center',
          color: 'white',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        }}
        variant="h2"
      >
        Welcome to Crumb!
      </Typography>

      <Card
        sx={{
          backgroundColor: '#3a6eac',
          p: 4,
          borderRadius: 4,
          mt: 5,
          width: '500px',
        }}
      >
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              sx={{ color: 'black' }}
            />
          </Grid>

          <Grid item mt={2}>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              InputProps={{ sx: { color: 'black' } }}
            />
          </Grid>

          <Grid item mt={3}>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: '225px', height: '60px', fontWeight: 'bold' }}
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
