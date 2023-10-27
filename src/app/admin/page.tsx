import { Box, Card, Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <Container>
      <Box>
        <Card elevation={2} sx={{ m: 2, p: 4 }}>
          <Typography variant="h2">Admin Dashboard ~</Typography>
          <Typography variant="body1">.</Typography>
        </Card>
      </Box>
    </Container>
  );
}
