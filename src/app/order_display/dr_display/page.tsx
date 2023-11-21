'use client';
import React from 'react';
import { Box, Card, CardHeader, Container, Typography, useTheme, Slide } from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Divider,
  ListItemText,
  Drawer,
} from '@mui/material';
// import { NavigateBeforeIcon, NavigateNextIcon, } from '@mui/icons-material';
import CardContent from '@mui/material/CardContent';
import styles from '../page.module.css';
import axios from 'axios';

import useSWR from 'swr';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR('/api/orders', fetcher, { refreshInterval: 5000 });
  //axios.get('/api/dishes').then((reponse) => console.log(reponse));

  const OrderCard = () => {
    if (isLoading) {
      return <></>;
    } else {
      //const item = item.order.filter((dish: any) => item.order);
      const orders = [];
      for (const item of data.orders) {
        const status = item.status;
        let statusColor = 'grey';

        if (status == 'in_progress') {
          statusColor = '#FB9902';
        } else if (status == 'completed') {
          statusColor = '#1F7D1F';
        } else {
          statusColor = 'grey';
        }

        console.log(item);
        orders.push(
          <>
            <Grid item>
              <Card
                sx={{
                  borderRadius: '10px',
                  borderColor: 'black',
                  border: 1,
                  width: 200,
                }}
                key={item.customerName}
              >
                <Typography
                  variant="h4"
                  bgcolor={statusColor}
                  color={'white'}
                  sx={{ width: '100%', borderStartEndRadius: '10px' }}
                  textAlign={'center'}
                >
                  {item.customerName}
                </Typography>

                <CardContent>
                  <Typography variant="h6" textAlign={'left'}>
                    {item.dish}
                  </Typography>
                  <Options options={item.options}></Options>
                </CardContent>
              </Card>
            </Grid>
          </>,
        );
      }

      return <>{orders}</>;
    }
  };

  const Options = (props: any) => {
    const options = [];
    const specific = [];

    for (const thing in props.options) {
      for (const x of props.options[thing]) {
        //console.log(x);
        specific.push(
          <>
            <Grid container justifyContent="flex-start" direction="row">
              <Grid item sx={{ m: 1 }}>
                <Chip
                  label={x}
                  color="primary"
                  sx={{
                    fontSize: '120%',
                    height: 'auto',
                    '& .MuiChip-label': {
                      display: 'block',
                      whiteSpace: 'normal',
                    },
                  }}
                ></Chip>
              </Grid>
            </Grid>
          </>,
        );
      }
      options.push(
        <Typography variant="body1" textAlign="center" sx={{ marginTop: '10%' }}>
          {specific}
        </Typography>,
      );
      //console.log(thing);
    }

    return <>{options}</>;
  };

  return (
    <div>
      <Card elevation={2} sx={{ m: 1, p: 2, backgroundColor: '#31425f' }}>
        <Typography textAlign="center" variant="h5" color="white">
          Kitchen Portal
        </Typography>
      </Card>

      <Grid container direction="row" justifyContent="flex-start">
        <Grid item xs={1.5}>
          <Card sx={{ width: '10vw', m: 0, height: '90vh' }}>
            <Typography variant="h5" textAlign="left" sx={{ marginTop: '10%', m: 2 }}>
              Total:
            </Typography>
            <List>
              <ListItem>
                <ListItemText>
                  <Typography variant="body1" textAlign="left">
                    4 Tacos
                  </Typography>
                  <Typography variant="body1" textAlign="left">
                    3 Burgers
                  </Typography>
                  <Typography variant="body1" textAlign="left">
                    2 Fries
                  </Typography>
                  <Typography variant="body1" textAlign="left">
                    10 Pepsis
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
          </Card>
        </Grid>

        <Grid item xs={10}>
          <Container sx={{ overflow: 'auto', height: '90vh' }}>
            <Grid container direction="row" justifyContent="flex-start" columnGap={10} spacing={2}>
              <OrderCard></OrderCard>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}
