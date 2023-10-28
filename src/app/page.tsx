import { Box, Card, Container, Button, Typography, Grid } from '@mui/material';

export default function Home() {
  return (
    <Container>
      <Box>
        <Card elevation={2} sx={{ m: 1, p: 10 }}>
          <Typography variant="h3">Welcome!</Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold' }}>
            The Crumb Cafe Homepage
          </Typography>
          <Grid container mt={3} spacing={4}>
            <Grid style={{ width: '300px' }} item xs={4}>
              <Button variant="contained" size="large" style={{ width: '100%', height: '300px' }}>
                Admin Page
              </Button>
            </Grid>

            <Grid style={{ width: '300px' }} item xs={4}>
              <Button variant="contained" size="large" style={{ width: '100%', height: '300px' }}>
                POS
              </Button>
            </Grid>

            <Grid style={{ width: '300px' }} item xs={4}>
              <Button
                variant="contained"
                size="large"
                sx={{ mb: '10px' }}
                style={{ width: '100%', height: '140px' }}
              >
                Order Display
              </Button>

              <Button
                variant="contained"
                size="large"
                sx={{ mt: '10px' }}
                style={{ width: '100%', height: '140px' }}
              >
                Public Order Display
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Container>
  );
}
