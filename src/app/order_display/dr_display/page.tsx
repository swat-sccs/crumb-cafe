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
import { Close, Update } from '@mui/icons-material';
import CardContent from '@mui/material/CardContent';
import styles from '../page.module.css';
import axios from 'axios';

import useSWR from 'swr';
import { gridColumnGroupsLookupSelector } from '@mui/x-data-grid';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR('/api/orders', fetcher, { refreshInterval: 1000 });
  //axios.get('/api/dishes').then((reponse) => console.log(reponse));

  const OrderCard = () => {
    if (isLoading) {
      return <></>;
    } else {
      const filteredOrders = data.orders.filter((dish: any) => dish.hidden == false);
      const orders = [];
      for (const item of filteredOrders) {
        const status = item.status;
        let statusColor = 'grey';

        if (status == 'in_progress') {
          statusColor = '#FB9902';
        } else if (status == 'completed') {
          statusColor = '#1F7D1F';
        } else {
          statusColor = 'grey';
        }

        //console.log(item);
        orders.push(
          <>
            <Grid item>
              <Card
                sx={{
                  borderRadius: '10px',
                  borderColor: 'black',
                  minHeight: '100px',
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
                </CardContent>

                <Grid
                  container
                  direction="column"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Grid container justifyContent="flex-start" direction="column">
                      <Options options={item.options}></Options>
                    </Grid>
                  </Grid>

                  <Grid item sx={{ mt: '10%' }}>
                    <Grid container direction="row" width="100%">
                      <Grid item>
                        <Button fullWidth onClick={() => updateOrder(item)}>
                          <Update />
                        </Button>
                      </Grid>

                      <Grid item>
                        <Button fullWidth onClick={() => completeOrder()}>
                          <Close />
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
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

    for (const key in props.options) {
      return props.options[key].map((option: any) => (
        <>
          <Grid item sx={{ m: 1 }}>
            <Chip
              label={option}
              color="primary"
              sx={{
                fontSize: '120%',
                '& .MuiChip-label': {
                  whiteSpace: 'normal',
                },
              }}
            ></Chip>
          </Grid>
        </>
      ));
    }
  };

  const completeOrder = () => {
    console.log('complete!');
  };

  const updateOrder = async (item: any) => {
    const url = '/api/orders/' + item._id;
    let theitem = Object.assign({}, item);

    const update = { status: 'in_progress' };

    theitem['status'] = 'in_progress';
    console.log(theitem);
    const config = { headers: { 'Content-Type': 'application/json' } };

    await axios.put(url, update).then((response) => {
      console.log(response);
    });

    console.log('complete!');
  };

  return (
    <div>
      <Card elevation={2} sx={{ m: 1, p: 2, backgroundColor: '#31425f' }}>
        <Typography textAlign="center" variant="h5" color="white">
          Kitchen Portal
        </Typography>
      </Card>

      <Container sx={{ mt: 5 }}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          sx={{ overflowY: 'scroll', height: '85vh' }}
          columnGap={2}
          spacing={2}
        >
          <OrderCard></OrderCard>
        </Grid>
      </Container>
    </div>
  );
}
