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
  TableContainer,
  FormGroup,
  FormControlLabel,
  Switch,
  ButtonGroup,
  Button,
  Chip,
  Grid,
  Badge,
  TextField,
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
import { disposeEmitNodes } from 'typescript';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Home() {
  const theme = useTheme();

  const { data, error, isLoading } = useSWR('/api/orders', fetcher, { refreshInterval: 1000 });
  //axios.get('/api/dishes').then((reponse) => console.log(reponse));
  const ePosDevice = useRef();
  const printer = useRef<any>();
  const printerIPAddress = process.env.NEXT_PUBLIC_PRINTERIP;
  const printerPort = '8008';
  const [PRINTER_IP, Set_PRINTERIP] = React.useState('192.168.192.168');
  const [showCompleted, setShowCompleted] = React.useState(false);
  const [deleteSwitch, setdeleteSwitch] = React.useState(false);
  const [SelectedOrder, setSelectedOrder] = React.useState<any>();
  const [deleteMe, setdeleteMe] = React.useState(false);
  const [STATUS_CONNECTED, setConnectionStatus] = React.useState('Not Connected');
  const handleIpEdit = (event: any) => {
    Set_PRINTERIP(event.target.value);
  };

  const handleCompleteSwitch = (event: any) => {
    //console.log(event.target.checked);
    setShowCompleted(event.target.checked);
  };

  const handleDeleteSwitch = (event: any) => {
    //console.log(event.target.checked);
    setdeleteSwitch(event.target.checked);
  };

  const connect = async () => {
    setConnectionStatus('Connecting ...');
    let ePosDev = new window.epson.ePOSDevice();

    ePosDevice.current = ePosDev;
    await ePosDev.connect(PRINTER_IP, printerPort, (data: any) => {
      if (data === 'OK') {
        ePosDev.createDevice(
          'local_printer',
          ePosDev.DEVICE_TYPE_PRINTER,
          { crypto: false, buffer: false },
          (devobj: any, retcode: any) => {
            if (retcode === 'OK') {
              printer.current = devobj;
              setConnectionStatus('CONNECTED');
            } else {
              setConnectionStatus('Connection Failed');
            }
          },
        );
      } else {
        setConnectionStatus('Connection Failed');
      }
    });
  };
  React.useEffect(() => {
    //
    connect();
    //console.log(window.epson.ePOSDevice());
  }, []);

  function queueDelete(item: any) {
    setSelectedOrder(item);
    console.log(item);
    setdeleteMe(true);
  }

  const OrderCard = () => {
    if (isLoading) {
      return <></>;
    } else {
      let filteredOrders = [];
      if (showCompleted) {
        filteredOrders = data.orders.sort((a: any, b: any) => a.hidden - b.hidden);
      } else {
        filteredOrders = data.orders.filter((dish: any) => dish.hidden == false);
      }
      const orders = [];
      filteredOrders = filteredOrders.sort((a: any, b: any) => {
        let a2 = moment(a.createdAt);
        let b2 = moment(b.createdAt);
        return b2.diff(a2);
      });

      for (const item of filteredOrders) {
        const status = item.status;
        let statusColor = 'grey';

        if (status == 'in_progress') {
          statusColor = '#FFA958';
        } else if (status == 'completed') {
          statusColor = '#799653';
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
                    variant="h5"
                    bgcolor={statusColor}
                    color={'white'}
                    sx={{ width: '100%', borderStartEndRadius: '10px', p: 0.5 }}
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
                        {deleteSwitch ? (
                          <Box sx={{ backgroundColor: theme.palette.error.light }}>
                            <Button fullWidth onClick={() => queueDelete(item)} color="inherit">
                              X
                            </Button>
                          </Box>
                        ) : null}

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

    prn.addText('------------------------------------------');
    prn.addText('ORDER ' + item.customerNumber + '       ' + moment().format('h:mm:ss a') + '\n');
    prn.addText('-----------------------------------------\n');

    prn.addTextAlign(prn.ALIGN_LEFT);
    for (const thing of item.dishes) {
      prn.addText(
        thing.friendlyName.substring(0, 15) +
          ' ................... $' +
          thing.price.toFixed(2) +
          '\n',
      );
      for (const item of thing.options) {
        prn.addText('\t + ' + item.friendlyName + '\n');
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

  const completeOrder = async (item: any) => {
    //PRINT2(item);
    const url = '/api/orders/' + item._id;
    let theitem = Object.assign({}, item);

    let foodies = Object.assign({}, theitem);
    let drinkies = Object.assign({}, theitem);
    foodies['dishes'] = theitem.dishes.filter((item: any) => item.tag == 'food');
    drinkies['dishes'] = theitem.dishes.filter((item: any) => item.tag == 'drink');
    if (foodies.dishes.length > 0) {
      PRINT2(foodies);
    }
    if (drinkies.dishes.length > 0) {
      PRINT2(drinkies);
    }

    theitem['status'] = 'completed';
    theitem['hidden'] = 'true';

    await axios.put(url, theitem).then((response) => {
      console.log(response);
    });
  };

  const deleteOrder = async (item: any) => {
    //PRINT2(item);

    const url = '/api/orders/' + SelectedOrder._id;
    let theitem = Object.assign({}, SelectedOrder);

    await axios.delete(url, theitem).then((response) => {
      console.log(response);
      setdeleteMe(false);
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
      {deleteMe ? (
        <>
          <Box
            onClick={() => setdeleteMe(false)}
            sx={{
              width: '100%',
              height: '100vh',
              position: 'absolute',
              top: '0',
              left: '0',
              zIndex: '10',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          ></Box>
          <Card
            sx={{
              width: '40%',
              height: '40%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              zIndex: '11',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <CardHeader
              style={{ backgroundColor: theme.palette.error.light }}
              titleTypographyProps={{ variant: 'h4', fontWeight: 'bold', textAlign: 'center' }}
              title={'DELETE ITEM?'}
            ></CardHeader>
            <Container>
              <Typography variant="h6" textAlign="center" sx={{ mt: '10%' }}>
                Are you sure you want to delete <br></br> {SelectedOrder.customerName} ?
              </Typography>
              <Grid container justifyContent="center" alignItems="center" sx={{ mt: '10%' }}>
                <Button variant="contained" color="error" onClick={deleteOrder} size="large">
                  CONFIRM DELTE
                </Button>
              </Grid>
            </Container>
          </Card>
        </>
      ) : null}

      <Grid container justifyContent="flex-end">
        <Grid item>
          <FormGroup>
            <FormControlLabel
              control={<Switch value={showCompleted} onChange={handleCompleteSwitch} />}
              label="Show Completed"
            />
          </FormGroup>
        </Grid>
        <Grid item>
          <FormGroup>
            <FormControlLabel
              control={<Switch value={deleteSwitch} onChange={handleDeleteSwitch} />}
              label="Show Delete"
            />
          </FormGroup>
        </Grid>
      </Grid>
      <TextField
        value={PRINTER_IP}
        label="IP Addr..."
        variant="outlined"
        size="small"
        onChange={handleIpEdit}
        sx={{ position: 'absolute', top: 15, right: 0, mr: '28%' }}
      />
      <Button
        color="secondary"
        disabled={STATUS_CONNECTED == 'CONNECTED'}
        sx={{ position: 'absolute', top: 2, right: 40, mt: '1%', mr: '10%' }}
        onClick={() => connect()}
      >
        <Sensors></Sensors> &nbsp;
        {STATUS_CONNECTED}
      </Button>
      <Container sx={{ mt: 2, width: '100%' }}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          sx={{ overflowY: 'scroll', height: '82vh' }}
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
