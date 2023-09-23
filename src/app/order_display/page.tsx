import { Box, Card, CardHeader, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import CardContent from '@mui/material/CardContent';
import styles from '../page.module.css';

// const stuffs : {order_number: string, name: string}[] = [
//   {order_number: "1",
//     name: "Tina Chen",},
//   {order_number: "1",
//     name: "Helen",
//   }
// ]

// function StuffCard({order_number, name} : 
//   {order_number : string, name : string}) {

//   return (  
//   <Card variant="outlined" sx={{ maxWidth: 250 }}>
//     <CardContent>
//       <Typography variant="h4"> {order_number} </Typography>
//       <Typography variant="body2"> {name} </Typography>
//     </CardContent>
//   </Card>
//   )
// };

export default function Home() {
  return (
    <Container>
      <Box>
        <Card color="inherit" elevation={2} sx={{ m: 2, p: 1 }}>
          <Typography variant="h3">Current Orders</Typography>
        </Card>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} md={4}>
            {/* <StuffCard order_number = {stuffs.order_number} name = {stuffs.name}></StuffCard> */}
            <Card sx={{ m: 2, p: 1 }}>
              {/* <CardHeader backgroundColor='#f44336'> 
              </CardHeader> */}
            <Typography variant="h4" textAlign="center">Tina</Typography>
            <Typography variant="h2" textAlign="center"> 33</Typography>
            </Card>
            <Card sx={{ m: 2, p: 1 }}>
                <Typography variant="h4" textAlign="center">Helen</Typography>
            <Typography variant="h2" textAlign="center"> 34</Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );

}