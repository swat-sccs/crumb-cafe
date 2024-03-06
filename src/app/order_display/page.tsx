'use client';
import {
  Box,
  Card,
  CardHeader,
  Container,
  Typography,
  List,
  ListItem,
  Divider,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material';
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

import useSWR from 'swr';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR('/api/orders', fetcher, { refreshInterval: 1000 });

  const Progress_List = () => {
    if (isLoading) {
      return <></>;
    } else {
      const filteredOrders = data.orders.filter(
        (dish: any) => dish.hidden == false && dish.status == 'in_progress',
      );
      const orders = [];
      for (const item of filteredOrders) {
        const status = item.status;

        //console.log(item);
        orders.push(
          <>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Typography variant="h4">#{item.customerNumber}</Typography>
                </ListItemAvatar>
                <Typography
                  variant="h4"
                  color={'white'}
                  sx={{ width: '100%', borderStartEndRadius: '10px' }}
                  textAlign={'center'}
                >
                  {item.customerName}
                </Typography>
              </ListItem>
              <Divider></Divider>
            </List>
          </>,
        );
      }

      return <>{orders}</>;
    }
  };

  const Completed_List = () => {
    if (isLoading) {
      return <></>;
    } else {
      console.log(data.orders);
      const filteredOrders = data.orders
        .filter((dish: any) => dish.status == 'completed')
        .reverse();
      const orders = [];
      for (const item of filteredOrders) {
        //console.log(item);
        orders.push(
          <>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Typography variant="h4">#{item.customerNumber}</Typography>
                </ListItemAvatar>
                <ListItemText>
                  <Typography
                    variant="h5"
                    color={'white'}
                    sx={{ width: '100%' }}
                    textAlign={'center'}
                  >
                    {item.customerName}
                  </Typography>
                </ListItemText>
              </ListItem>
              <Divider></Divider>
            </List>
          </>,
        );
      }

      return <>{orders}</>;
    }
  };
  return (
    <Container>
      <Box>
        <Grid container justifyContent="center" alignContent="center">
          <Card elevation={10} sx={{ m: 2, p: 2, backgroundColor: '#93CBF3', width: '50%' }}>
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
            <Card
              elevation={2}
              sx={{ m: 2, p: 2, width: 350, height: '60vh', overflowY: 'scroll' }}
              style={{
                background: 'rgba(0,0,0,0.37)',
                backdropFilter: 'blur(10px)',
                boxShadow: '10px 10px 10px rgba(30,30,30,0.5)',
                WebkitBackdropFilter: 'blur(6.8px)',
              }}
            >
              <Progress_List></Progress_List>
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
            <Card
              elevation={2}
              sx={{ m: 2, p: 2, width: 350, height: '60vh', overflowY: 'scroll' }}
              style={{
                background: 'rgba(0,0,0,0.37)',
                backdropFilter: 'blur(10px)',
                boxShadow: '10px 10px 10px rgba(30,30,30,0.5)',
                WebkitBackdropFilter: 'blur(6.8px)',
              }}
            >
              <Completed_List></Completed_List>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
