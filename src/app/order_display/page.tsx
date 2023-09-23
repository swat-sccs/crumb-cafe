import { Box, Card, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2


export default function Home() {
  return (
    <Container>
      <Box>
        <Card elevation={2} sx={{ m: 2, p: 1 }}>
          <Typography variant="h3">Current Orders</Typography>
          <Typography variant="body1">Here&apos;s a landing page for the Crumb Cafe.</Typography>
        </Card>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Card> 
              <Typography variant="h4">Tina</Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

