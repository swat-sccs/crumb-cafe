import { Box, Card, CardHeader, Container, Typography, useTheme } from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import CardContent from '@mui/material/CardContent';
import styles from '../page.module.css';

//if we want to use a table to display orders that are ready:
// function createData(
//   order_number: number,
//   name: string,
// ) {
//   return { order_number, name };
// }

// const rows = [
//   createData( 2, 'Summit'),
//   createData( 3, 'Helen'),
//   createData( 5, 'Tina'),
// ];

// function BasicTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Order Number</TableCell>
//             <TableCell>Name</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow
//               key={row.name}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.order_number}
//               </TableCell>
//               <TableCell>{row.name}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

export default function Home() {
  return (
    <Container>
      <Box>
        <Grid container justifyContent="center" alignContent="center">
          <Card elevation={10} sx={{ m: 2, p: 2, backgroundColor: '#31425f', width: '50%' }}>
            <Typography textAlign="center" variant="h3" color="white">
              Orders
            </Typography>
          </Card>
        </Grid>

        <Grid container direction="row" alignItems="center" justifyContent="space-between">
          <Grid container direction="column" spacing={2} justifyContent="center">
            <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card sx={{ m: 2, p: 1, width: 300 }}>
                <Typography variant="h4" textAlign="center">
                  In Progress
                </Typography>
              </Card>
            </Grid>
            <Card elevation={2} sx={{ m: 2, p: 2, width: 350, height: 450 }}>
              <Typography textAlign="left" variant="h3">
                Order #1: Tina
              </Typography>
            </Card>
          </Grid>

          <Grid container direction="column" spacing={2} justifyContent="center">
            <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card sx={{ m: 2, p: 1, width: 300 }}>
                <Typography variant="h4" textAlign="center">
                  Ready
                </Typography>
              </Card>
            </Grid>
            <Card elevation={2} sx={{ m: 2, p: 2, width: 350, height: 450 }}>
              <Typography textAlign="left" variant="h3">
                Order #1: Tina
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
