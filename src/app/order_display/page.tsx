import { Box, Card, CardHeader, Container, Typography, useTheme} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import CardContent from '@mui/material/CardContent';
import styles from '../page.module.css';

const stuffs : {order_number: string, name: string}[] = [
  {order_number: "1",
    name: "Tina Chen",},
  {order_number: "1",
    name: "Helen",
  },
  {order_number: "2",
    name: "Summit",
  }
]

function StuffCard({order_number, name} : 
  {order_number : string, name : string}) {

  return (  
  <Card variant="outlined" sx={{ m: 2, p: 1 }}>
    <CardContent>
      <Box bgcolor={"red"} color={"white"}>
         <Typography variant="h4" textAlign={"center"}> {name} </Typography>
      </Box>
      <Typography variant="h4" textAlign={"center"}> {order_number} </Typography>
     
    </CardContent>
  </Card>
  )
};

export default function Home() {
  return (
    <Container>
      <Box>
        <Card elevation={2} sx={{ m: 2, p: 2, backgroundColor: '#31425f' }}>
          <Typography textAlign="center" variant="h3" color='white'>Crumb Cafe Orders</Typography>
        </Card>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Card sx={{ m: 2, p: 1 }}>
              <Typography variant="h4" textAlign="center">Completed</Typography>
            </Card>
          </Grid> 
          <Grid xs={6}>
            <Card sx={{ m: 2, p: 1 }}>
              <Typography variant="h4" textAlign="center">Pending...</Typography>
            </Card>
          </Grid> 
          {stuffs.map((stuff) =>
            <Grid xs={3}>
              <StuffCard name = {stuff.name} order_number = {stuff.order_number} />
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

// what to do with long names & too many orders (makes page have to scroll)
//how to change border color of each order name tag
//split page in half for completed & pending orders
// How to implement card content function for less code