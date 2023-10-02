import { Box, Card, CardHeader, Container, Typography, useTheme } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import CardContent from '@mui/material/CardContent';
import styles from '../page.module.css';


//stuff card functions that we will need for the kitchen order display
// const stuffs: { order_number: string; name: string }[] = [
//   { order_number: '1', name: 'Tina Chen' },
//   { order_number: '2', name: 'Helen Yin' },
//   { order_number: '3', name: 'Summit' },
// ];

// // testing for lot of orders: stuffs repeated 10 times
// const lotOfStuffs: { order_number: string; name: string }[] = Array.from({ length: 10 }, () => [
//   ...stuffs,
// ]).flat();

// function StuffCard({ order_number, name }: { order_number: string; name: string }) {
//   return (
//     <Card sx={{ m: 2, borderRadius: '16px', borderColor: 'black', border: 1 }}>
//       <Typography
//         variant="h5"
//         bgcolor={'green'}
//         color={'white'}
//         sx={{ width: '100%', borderStartEndRadius: '16px' }}
//         textAlign={'center'}
//       >
//         {' '}
//         {name}{' '}
//       </Typography>
//       <CardContent>
//         <Typography variant="h5" textAlign={'center'}>
//           {' '}
//           {order_number}{' '}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// }

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
        <Card elevation={2} sx={{ m: 2, p: 2, backgroundColor: '#31425f' }}>
          <Typography textAlign="center" variant="h3" color="white">
            Crumb Cafe Orders
          </Typography>
        </Card>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Card sx={{ m: 2, p: 1 }}>
              <Typography variant="h4" textAlign="center">
                Ready
              </Typography>
            </Card>
          </Grid>
          <Card elevation={2} sx={{ m: 2, p: 2, width: 1200, height:450 }}>
          <Typography textAlign="left" variant="h3">
            Order #1: Tina
          </Typography>
        </Card>
          {/* <Grid xs={12}>
            <BasicTable />
          </Grid> */}
          {/* <Grid xs={6}>
            <Card sx={{ m: 2, p: 1 }}>
              <Typography variant="h4" textAlign="center">
                Pending...
              </Typography>
            </Card>
          </Grid> */}
          {/* {lotOfStuffs.map((stuff) => (
            <Grid xs={3}>
              <StuffCard name={stuff.name} order_number={stuff.order_number} />
            </Grid>
          ))} */}
        </Grid>
      </Box>
    </Container>
  );

}
