/*
SO.... RE write the submit function to send over entire orders onSubmit()
THEN... In the backend change around the api to accept a list of the already format 'singular' orders
THEN... CRY
*/
'use client';
import React, { useRef, useState } from 'react';
import { Box, Card, CardHeader, Container, Typography, useTheme, Slide } from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ButtonGroup,
  Button,
  Chip,
  Grid,
  Badge,
  ListItemAvatar,
  Divider,
  ImageListItem,
  ImageList,
} from '@mui/material';
import { Sensors, Print, Update } from '@mui/icons-material';
import CardContent from '@mui/material/CardContent';
import styles from '../page.module.css';
import axios from 'axios';
import Script from 'next/script';
import moment from 'moment';
import useSWR from 'swr';
import { gridColumnGroupsLookupSelector } from '@mui/x-data-grid';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR('/api/orders', fetcher, { refreshInterval: 1000 });
  //axios.get('/api/dishes').then((reponse) => console.log(reponse));
  const ePosDevice = useRef();
  const printer = useRef<any>();
  const printerIPAddress = process.env.NEXT_PUBLIC_PRINTERIP;
  const printerPort = '8008';

  const [STATUS_CONNECTED, setConnectionStatus] = React.useState('Not Connected');

  const connect = () => {
    setConnectionStatus('Connecting ...');

    let ePosDev = new window.epson.ePOSDevice();
    ePosDevice.current = ePosDev;

    ePosDev.connect(printerIPAddress, printerPort, (data: any) => {
      if (data === 'OK') {
        ePosDev.createDevice(
          'local_printer',
          ePosDev.DEVICE_TYPE_PRINTER,
          { crypto: true, buffer: false },
          (devobj: any, retcode: any) => {
            if (retcode === 'OK') {
              printer.current = devobj;
              setConnectionStatus('CONNECTED');
            } else {
              setConnectionStatus('Connection Failed');
              throw retcode;
            }
          },
        );
      } else {
        setConnectionStatus('Connection Failed');
        throw data;
      }
    });
  };

  React.useEffect(() => {
    //
    //console.log(window.epson.ePOSDevice());
  }, []);

  const OrderCard = () => {
    if (isLoading) {
      return <></>;
    } else {
      const filteredOrders = data.orders.filter((dish: any) => dish.hidden == false);
      const orders = [];
      console.log(data.orders);

      for (const item of filteredOrders) {
        const status = item.status;
        let statusColor = 'grey';

        if (status == 'in_progress') {
          statusColor = '#FFA958';
        } else if (status == 'completed') {
          statusColor = '#CCFE8C';
        } else {
          statusColor = 'grey';
        }

        orders.push(
          <>
            <Grid item key={item._id} sx={{ mt: '1%' }}>
              <Badge badgeContent={item.dishes.length} color="primary">
                <Card
                  style={{
                    background: 'rgba(0,0,0,0.37)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '10px 10px 10px rgba(30,30,30,0.5)',
                    WebkitBackdropFilter: 'blur(6.8px)',
                  }}
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

                  <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                    alignItems="center"
                    //sx={{ height: '100%' }}
                  >
                    <Grid item>
                      <Grid container justifyContent="flex-start" direction="column">
                        <Container>
                          <DishAndOptions dishes={item.dishes}></DishAndOptions>
                        </Container>
                      </Grid>
                    </Grid>

                    <Grid item container direction="row" sx={{ mt: '15%' }}>
                      <ButtonGroup fullWidth variant="contained">
                        <Button fullWidth onClick={() => updateOrder(item)}>
                          <Update></Update>
                        </Button>
                        <Button fullWidth onClick={() => completeOrder(item)}>
                          <Print></Print>
                        </Button>
                      </ButtonGroup>
                    </Grid>
                  </Grid>
                </Card>
              </Badge>
            </Grid>
          </>,
        );
      }

      return <>{orders}</>;
    }
  };

  const DishAndOptions = (props: any) => {
    let options = [];
    let DishAndOptions = [];

    for (let item of props.dishes) {
      for (let option of item.options) {
        options.push(
          <>
            <Grid item sx={{ m: 1 }} key={option._id}>
              <Chip
                size="small"
                label={option.friendlyName}
                color="primary"
                sx={{
                  height: 'auto',
                  '& .MuiChip-label': {
                    display: 'block',
                    whiteSpace: 'normal',
                  },
                }}
              ></Chip>
            </Grid>
          </>,
        );
      }
      DishAndOptions.push(
        <>
          <Box key={item._id} sx={{ width: '10vw' }}>
            <Typography variant="h6" textAlign="left" sx={{ mt: '10%' }}>
              {item.friendlyName}
            </Typography>
            {options}
            <Divider></Divider>
          </Box>
        </>,
      );
      options = [];
    }
    return <>{DishAndOptions}</>;
  };

  async function PRINT2(item: any) {
    const prn: any = printer.current;

    prn.addTextAlign(prn.ALIGN_CENTER);
    prn.addTextSmooth(true);
    prn.addTextDouble(true, true);
    prn.addText('CRUMB CAFE\n');
    prn.addTextDouble(false, false);
    prn.addText('Sale Ticket\n\n');

    prn.addText('---------------------------------');
    prn.addText('ORDER ' + item.customerNumber + '       ' + moment().format('h:mm:ss a') + '\n');
    prn.addText('---------------------------------\n');

    prn.addTextAlign(prn.ALIGN_LEFT);
    for (const thing of item.dishes) {
      prn.addText(
        thing.friendlyName.substring(0, 7) +
          ' ................... $' +
          thing.price.toFixed(2) +
          '\n',
      );
      for (const item of thing.options) {
        prn.addText('\t' + item.friendlyName + '\n');
      }
    }

    prn.addFeedLine(3);
    prn.addTextAlign(prn.ALIGN_CENTER);
    prn.addTextStyle(false, true, true, prn.COLOR_2);
    prn.addTextDouble(true, true);
    prn.addText(item.customerName + '\n');

    prn.addCut(prn.CUT_FEED);
    prn.send();
  }

  async function PRINT3(item: any) {
    const prn: any = printer.current;

    prn.addTextAlign(prn.ALIGN_CENTER);
    prn.addTextSmooth(true);
    prn.addTextDouble(true, true);
    prn.addText('CRUMB CAFE\n');
    prn.addTextDouble(false, false);
    prn.addText('Project Updates\n\n');

    prn.addText('---------------------------------');
    prn.addText('STATUS - Beta   ' + moment().format('h:mm:ss a') + '\n');
    prn.addText('---------------------------------\n\n');

    prn.addText('- Printer works\n   Can Print Anywhere\n');
    prn.addText('---------------------------------\n');
    prn.addText('- UI needs reskin with Crumb pics\n');
    prn.addText('- Add search for menu creation\n');
    prn.addText('- Filter orders by similar \n');
    prn.addText('    Good for order runners\n');
    prn.addText('- UI reskin with Crumb Images\n');
    prn.addText('- Device? Ipad? Surface(ish)?\n');
    prn.addText('- Login?\n');
    prn.addText('   crumb.sccs.swarthmore.edu\n');
    prn.addText('   currently pub access\n');

    prn.addFeedLine(3);
    prn.addTextAlign(prn.ALIGN_CENTER);
    prn.addTextStyle(false, true, true, prn.COLOR_2);
    prn.addTextDouble(true, true);
    prn.addText(':)\n');

    prn.addCut(prn.CUT_FEED);
    prn.send();
  }

  const completeOrder = async (item: any) => {
    PRINT2(item);
    const url = '/api/orders/' + item._id;
    let theitem = Object.assign({}, item);

    theitem['status'] = 'completed';
    theitem['hidden'] = 'true';

    await axios.put(url, theitem).then((response) => {
      console.log(response);
    });
  };

  const updateOrder = async (item: any) => {
    const url = '/api/orders/' + item._id;
    let theitem = Object.assign({}, item);

    if (theitem.status == 'new') {
      theitem.status = 'in_progress';
      await axios.put(url, theitem).then((response) => {
        console.log(response);
      });
    }
    /*
    
    else if (theitem['status'] == 'in_progress') {
      theitem['updates'].push({
        _id: theitem['_id'],
        newStatus: 'completed',
        user: 'admin',
      });
      theitem['status'] = 'completed';
      theitem['hidden'] = 'true';
    }*/
  };

  return (
    <div>
      <Script src="./epos-2.27.0.js"></Script>
      <Button
        color="secondary"
        disabled={STATUS_CONNECTED == 'CONNECTED'}
        sx={{ position: 'absolute', top: 0, right: 0, mt: '1%', mr: '10%' }}
        onClick={() => connect()}
      >
        <Sensors></Sensors> &nbsp;
        {STATUS_CONNECTED}
      </Button>
      <Container sx={{ mt: 5, width: '100%' }}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          sx={{ overflowY: 'scroll', height: '87vh' }}
          columnGap={2}
          rowSpacing={1}
          spacing={{ xs: 0, md: 1, lg: 1 }}
        >
          <OrderCard></OrderCard>
        </Grid>
      </Container>
    </div>
  );
}
