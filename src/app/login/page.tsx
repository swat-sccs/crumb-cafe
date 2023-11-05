'use client';
import { Box, Card, Container, Button, Typography, Grid } from '@mui/material';

export default function Home() {
  return (
  <div>
  <Card>
    <Typography
        sx={{marginTop: '5%',
            textAlign: 'center'}}
        variant="h2"
        
        style={{fontWeight: 'bold', color: 'white'}}
    >
    Welcome to Crumb!
    </Typography>
  </Card>
  
  <Button
  sx={{ m: 10, p: 15}}>

    <Typography
        variant="h2">
        Sign in
    </Typography>
  </Button>
  </div>
  );
}

