'use client';
import React from 'react';
import { TextField, Button, Typography, Grid, Card } from '@mui/material';
import styles from './page.module.css';

export default function login() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundImage:
          'url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/188d1124-068d-471a-97e1-25f02ffa310a/d8e6xr5-0ce7cd3f-1f63-49f8-b3b8-e1107ef85b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE4OGQxMTI0LTA2OGQtNDcxYS05N2UxLTI1ZjAyZmZhMzEwYVwvZDhlNnhyNS0wY2U3Y2QzZi0xZjYzLTQ5ZjgtYjNiOC1lMTEwN2VmODViNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Wh7n0r-cFnXsIgxyXCPvD0w8wzSRsPJyApb2CkXFLmY")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
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
