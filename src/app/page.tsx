import { Box, Card, Container, Button, Typography } from '@mui/material';

export default function Home() {
  return (
    <Container>
      <Box>
        <Card elevation={2} sx={{ m: 10, p: 10 }}>
          <Typography variant="h3">Welcome!</Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold' }}>The Crumb Cafe Homepage</Typography>

          <Button variant="contained" size="large" sx={{ m: 1, p: 2, width: '130px' }}>Admin Page</Button>
          <Button variant="contained" size="large" sx={{ m: 1, p: 2, width: '130px' }}>POS</Button>
          <Button variant="contained" size="large" sx={{ m: 1, p: 2, width: '130px' }}>Kitchen</Button>
          
        </Card>
      </Box>
    </Container>
  );
}
