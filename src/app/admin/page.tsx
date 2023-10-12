import { Box, Card, Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <Container>
      <Box>
        <Card elevation={2} sx={{ m: 2, p: 4 }}>
          <Typography variant="h2">Hello World ~</Typography>
          <Typography variant="body1">Here&apos;s a landing page for the Crumb Cafe.</Typography>
        </Card>

        <Card elevation={2} sx={{ m: 2, p: 4 }}>
          <Typography variant="h2">Hello World ~</Typography>
          <Typography variant="body1">Here&apos;s a landing page for the Crumb Cafe.</Typography>
        </Card>

        <Card elevation={2} sx={{ m: 2, p: 4 }}>
          <Typography variant="h2">Hello World ~</Typography>
          <Typography variant="body1">Here&apos;s a landing page for the Crumb Cafe.</Typography>
        </Card>

        <Card elevation={2} sx={{ m: 2, p: 4 }}>
          <Typography variant="h2">Hello World ~</Typography>
          <Typography variant="body1">Here&apos;s a landing page for the Crumb Cafe.</Typography>
        </Card>
      </Box>
    </Container>
  );
}
