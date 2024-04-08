'use client';
import {
  Box,
  Card,
  Container,
  Typography,
  List,
  ListItem,
  Divider,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import moment from 'moment';

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import useSWR from 'swr';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR('/api/orders', fetcher, { refreshInterval: 1000 });

  function compareFn(a: any, b: any) {
    if (a.created < b.createdAt) {
      return -1;
    } else if (a.createdAt > b.createdAt) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }

  const Progress_List = () => {
    if (isLoading) {
      return <></>;
    } else {
      const filteredOrders = data.orders.filter(
        (dish: any) =>
          dish.hidden == false &&
          dish.status == 'in_progress' &&
          moment().isSame(moment(dish.createdAt), 'day'),
      );
      console.log(filteredOrders);
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
        .filter(
          (dish: any) =>
            dish.status == 'completed' && moment().isSame(moment(dish.createdAt), 'day'),
        )
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
                    variant="h4"
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
    <Box>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
        sx={{ width: '100%' }}
      >
        <Grid container direction="column" spacing={2} justifyContent="center" lg={5}>
          <Grid>
            <Card sx={{ p: 1, width: 300, ml: 'auto', mr: 'auto', mb: 2, mt: 2 }}>
              <Typography variant="h3" textAlign="center">
                In Progress
              </Typography>
            </Card>
          </Grid>
          <Card
            elevation={2}
            sx={{
              height: '85dvh',
              overflowY: 'hidden',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
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

        <Grid container direction="column" spacing={2} justifyContent="center" lg={5}>
          <Grid>
            <Card sx={{ p: 1, width: 300, ml: 'auto', mr: 'auto', mb: 2, mt: 2 }}>
              <Typography variant="h3" textAlign="center">
                Ready
              </Typography>
            </Card>
          </Grid>
          <Card
            elevation={2}
            sx={{
              height: '85dvh',
              overflowY: 'hidden',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
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
  );
}
