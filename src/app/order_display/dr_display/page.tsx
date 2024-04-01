'use client';
import React from 'react';
import { Card, Container, Typography } from '@mui/material';
import { ButtonGroup, Button, Chip, Grid } from '@mui/material';
import { Close, Update } from '@mui/icons-material';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';

import useSWR from 'swr';

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
                  //border: 1,
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
                  <Typography variant="h6" textAlign={'center'}>
                    {item.dish}
                  </Typography>
                </CardContent>

                <Grid
                  container
                  direction="column"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ height: '100%' }}
                >
                  <Grid item>
                    <Grid container justifyContent="flex-start" direction="column">
                      <Options options={item.options}></Options>
                    </Grid>
                  </Grid>

                  <Grid container sx={{ mt: '10%' }} direction="row">
                    <ButtonGroup fullWidth variant="contained">
                      <Button fullWidth onClick={() => updateOrder(item)}>
                        <Update></Update>
                      </Button>
                      <Button fullWidth onClick={() => completeOrder(item)}>
                        <Close></Close>
                      </Button>
                    </ButtonGroup>
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
    for (const item of props.options) {
      options.push(
        <>
          <Grid item sx={{ m: 1 }}>
            <Chip
              label={item.friendlyName}
              color="primary"
              sx={{
                fontSize: '120%',
                '& .MuiChip-label': {
                  whiteSpace: 'normal',
                },
              }}
            ></Chip>
          </Grid>
        </>,
      );
    }
    return <>{options}</>;
  };

  const completeOrder = async (item: any) => {
    const url = '/api/orders/' + item._id;
    const theitem = Object.assign({}, item);

    theitem['updates'].push({
      _id: theitem['_id'],
      newStatus: 'completed',
      user: 'admin',
    });
    theitem['status'] = 'completed';
    theitem['hidden'] = 'true';

    await axios.put(url, theitem).then((response) => {
      console.log(response);
    });
  };

  const updateOrder = async (item: any) => {
    const url = '/api/orders/' + item._id;
    const theitem = Object.assign({}, item);

    if (theitem['status'] == 'new') {
      theitem['updates'].push({
        _id: theitem['_id'],
        newStatus: 'in_progress',
        user: 'admin',
      });
      theitem['status'] = 'in_progress';
    } else if (theitem['status'] == 'in_progress') {
      theitem['updates'].push({
        _id: theitem['_id'],
        newStatus: 'completed',
        user: 'admin',
      });
      theitem['status'] = 'completed';
      theitem['hidden'] = 'true';
    }

    await axios.put(url, theitem).then((response) => {
      console.log(response);
    });
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
          spacing={{ xs: 0, md: 1, lg: 2 }}
        >
          <OrderCard></OrderCard>
        </Grid>
      </Container>
    </div>
  );
}
